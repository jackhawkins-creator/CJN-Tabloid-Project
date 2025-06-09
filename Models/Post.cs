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
    }