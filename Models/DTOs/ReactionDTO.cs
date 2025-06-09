namespace Tabloid.Models.DTOs;

public class ReactionDTO
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public int UserProfileId { get; set; }
    public string Emoji { get; set; }
    public DateTime ReactedOn { get; set; }
}
