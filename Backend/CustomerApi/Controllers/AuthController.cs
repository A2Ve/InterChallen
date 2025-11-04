using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerApi.Data;
using CustomerApi.Models;
using CustomerApi.Services;

namespace CustomerApi.Controllers;
[Route("api/[controller]")]
[ApiController]

public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    // ges database and token service automatically
    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        // Check if username already exists, if true returns BadRequest.
        bool userExists = await _context.Users.AnyAsync(u => u.Username == dto.Username);
        if (userExists)
        {
            return BadRequest("Username already exists.");
        }

        // Hash the password
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        //Create new user
        var user = new User
        {
            Username = dto.Username,
            PasswordHash = passwordHash
        };

        //Save to database (new row in Users table)
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        //Create a token for the new user
        string token = _tokenService.CreateToken(user);

        // Return success with token
        return Ok(new
        {
            message = "Registration successful",
            token = token,
            username = user.Username

        });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        // Find user by Username
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == dto.Username);

        // Check if user exists
        if (user == null)
        {
            return Unauthorized("Invalid Username or Password. ");
        }

        // Verify password
        bool passwordCorrect = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!passwordCorrect)
        {
            return Unauthorized("Invalid Username or Password. ");
        }

        //password is correct / create token
        string token = _tokenService.CreateToken(user);
        // will retiurn with token 
        return Ok(new
        {
            message = "Login successful",
            token = token,
            username = user.Username
        });
    }
}