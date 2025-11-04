using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CustomerApi.Models;
using Azure.Identity;

namespace CustomerApi.Services;

public class TokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // Creates a JWT token for a user
    public string CreateToken(User user)
    {
        // Get the secret key from configuration
        string secretKey = _configuration["Jwt:Key"] ?? "";
        byte[] keyBytes = Encoding.UTF8.GetBytes(secretKey);

        // create "claims" - pieces of information about the user stored in the token

        var claims = new List<Claim>
        {
            new Claim("userId", user.UserId.ToString()),
            new Claim("username", user.Username)
        };
        // Create signing credentials using the secret key
        var signingKey = new SymmetricSecurityKey(keyBytes);
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        // expiration (24 hours)
        var expires = DateTime.UtcNow.AddHours(24);

        // Create the JWT token
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: credentials
        );

        // Convert token to string then returns
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}