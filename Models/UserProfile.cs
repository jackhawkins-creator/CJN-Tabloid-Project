using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Models;

public class UserProfile
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; }

    [NotMapped]
    public string UserName { get; set; }

    [NotMapped]
    public string Email { get; set; }

    public DateTime CreateDateTime { get; set; }

    [DataType(DataType.Url)]
    [MaxLength(255)]
    public string ImageLocation { get; set; }

    [NotMapped]
    public List<string> Roles { get; set; }

    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }

    public string FullName
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }

    [NotMapped]
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