namespace CustomerApi.Models;
public class Customer
{
    public int CustomerId { get; set; }      // primary key
    public string CustomerName { get; set; } = "";
    public DateOnly DateOfBirth { get; set; }
    public char Gender { get; set; }
}