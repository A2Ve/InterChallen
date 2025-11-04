using System.ComponentModel.DataAnnotations;

namespace CustomerApi.Models;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [StringLength(100)]
    public string Username { get; set; } = "";
    [Required]
    public string PasswordHash { get; set; } = "";
}