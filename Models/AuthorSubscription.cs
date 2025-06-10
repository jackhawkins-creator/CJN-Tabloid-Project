using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class AuthorSubscription
{
    public int Id { get; set; }

    [Required]
    public int SubscriberUserId { get; set; }

    [Required]
    public int AuthorUserId { get; set; }

    public DateTime SubscribedOn { get; set; }
}
