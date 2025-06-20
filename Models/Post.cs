using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;


public class Post
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    public string SubTitle { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public DateTime PublishingDate { get; set; }

    public string HeaderImageUrl { get; set; }

    [Required]
    public string Body { get; set; }

    [Required]
    public int AuthorId { get; set; }
    public int ReadTime
    {
        get
        {
            int wordCount = Body.Split(new char[] { ' ', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Length;


            return (int)Math.Ceiling(wordCount / 200.0);
        }
    }
    public Category Category { get; set; }
    public UserProfile Author { get; set; }
    public List<Reaction> Reactions { get; set; }
    public PostTag PostTag { get; set;}

}