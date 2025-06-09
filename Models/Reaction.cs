using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Reaction
{
    public int Id { get; set; }

    [Required]
    public int PostId { get; set; }

    [Required]
    public int UserProfileId { get; set; }

    [Required]
    public string Emoji { get; set; }

    public DateTime ReactedOn { get; set; }
}