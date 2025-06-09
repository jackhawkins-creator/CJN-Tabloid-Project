namespace Tabloid.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime CreateDateTime { get; set; }
    public string ImageLocation { get; set; }
    public string IdentityUserId { get; set; }

    // Optional: include if needed for display/UI
    public string FullName => $"{FirstName} {LastName}";
}
