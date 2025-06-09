namespace Tabloid.Models;

public class AuthorSubscriptionDTO
{
    public int Id { get; set; }

    public int SubscriberUserId { get; set; }

    public int AuthorUserId { get; set; }

    public DateTime SubscribedOn { get; set; }
}
