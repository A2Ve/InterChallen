using System.ComponentModel.DataAnnotations;

namespace CustomerApi.Models;

public class LoginDto
{
    [Required]
    public string Username { get; set; } = "";

    [Required]
    public string Password { get; set; } = "";
}

public class RegisterDto
{
    [Required]
    [StringLength(100)]
    public string Username { get; set; } = "";

    [Required]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be more than 6 characters.")]
    public string Password { get; set; } = "";
}

public class AuthResponseDto
{
    public string Token { get; set; } = "";
    public string Username { get; set; } = "";
}