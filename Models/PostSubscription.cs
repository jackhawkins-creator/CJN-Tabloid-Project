using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class PostSubscription
{
    public int Id { get; set; }

    [Required]
    public int PostId { get; set; }

    [Required]
    public int SubscriberId { get; set; }

    public DateTime SubscribedOn { get; set; }

}
