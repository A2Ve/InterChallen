using System.ComponentModel.DataAnnotations;

namespace CustomerApi.Models;
public class Customer
{
    [Required]
    [Range(0, 999_999_999)]
    public int CustomerId { get; set; }
    [Required]
    [StringLength(maximumLength: 255, ErrorMessage = "Name length can't be more than 255 characters.")]
    public string CustomerName { get; set; } = "";
    [Required]
    [DataType(DataType.Date)]
    public DateOnly DateOfBirth { get; set; }
    [Required]
    [StringLength(1)]
    public string Gender { get; set; } = "";
}