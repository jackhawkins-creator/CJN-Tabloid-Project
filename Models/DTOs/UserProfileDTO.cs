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
    public string TimeSinceJoin
    {
        get
        {
            DateTime now = DateTime.UtcNow;
            TimeSpan timeElapsed = now - CreateDateTime;

            if (timeElapsed.TotalDays >= 1)
            {
                int days = (int)Math.Floor(timeElapsed.TotalDays);
                if (days == 1)
                {
                    return "Joined 1 day ago";
                }
                else
                {
                    return $"Joined {days} days ago";
                }
            }
            else if (timeElapsed.TotalHours >= 1)
            {
                int hours = (int)Math.Floor(timeElapsed.TotalHours);
                if (hours == 1)
                {
                    return "Joined 1 hour ago";
                }
                else
                {
                    return $"Joined {hours} hours ago";
                }
            }
            else
            {
                int minutes = (int)Math.Floor(timeElapsed.TotalMinutes);
                if (minutes <= 1)
                {
                    return "Joined just now";
                }
                else
                {
                    return $"Joined {minutes} minutes ago";
                }
            }
        }
    }
}
