namespace Tabloid.Models.DTOs;

public class PostDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SubTitle { get; set; }
    public int CategoryId { get; set; }
    public DateTime PublishingDate { get; set; }
    public string HeaderImageUrl { get; set; }
    public string Body { get; set; }
    public int AuthorId { get; set; }
}
