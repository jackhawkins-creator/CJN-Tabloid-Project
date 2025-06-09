using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class PostTag
{
    public int Id { get; set; }

    [Required]
    public int PostId { get; set; }

    [Required]
    public int TagId { get; set; }
}
