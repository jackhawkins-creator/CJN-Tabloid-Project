namespace Tabloid.Models.DTOs;

public class PostSubscriptionDTO
{
    public int Id { get; set; }

    public int PostId { get; set; }

    public int SubscriberId { get; set; }

    public DateTime SubscribedOn { get; set; }

}
