using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;


namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]


public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;


    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }


    //GET all posts, newest to oldest
    [HttpGet]
    //[Authorize]
    public IActionResult GetAllPosts()
    {
        return Ok(_dbContext.Posts
            .OrderByDescending(p => p.PublishingDate)
            .ToList());
    }

    //GET post by id
    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetById(int id)
    {
        Post post = _dbContext
            .Posts
            .Include(p => p.Category)
            .Include(p => p.Author)
                .ThenInclude(up => up.IdentityUser)
            .Include(p => p.Reactions)
            .SingleOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    //DELETE: api/Post/{id}
    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeletePost(int id)
    {
        Post post = _dbContext.Posts.SingleOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        _dbContext.Posts.Remove(post);
        _dbContext.SaveChanges();

        return NoContent();
    }

    //POST Post (yeah yeah confusing but deal with it)
    //Raw Body Test Data:
    /*
    {
        "title": "Exploring Blazor for Web Development",
        "subTitle": "Modern .NET-powered frontend",
        "categoryId": 4,
        "headerImageUrl": "https://example.com/images/blazor.jpg",
        "body": "Blazor offers an exciting way to write web UIs using C# instead of JavaScript...",
        "authorId": 2
    }
    */
    [HttpPost]
    //[Authorize]
    public IActionResult CreatePost(Post post)
    {
        post.PublishingDate = DateTime.Now;
        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();
        return Created($"/api/post/{post.Id}", post);
    }

    //GET all posts for a logged in user
    [HttpGet("mine")]
    //[Authorize]
    public IActionResult GetMyPosts()
    {
        string currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (currentUserId == null)
        {
            return Unauthorized();
        }

        UserProfile userProfile = _dbContext
            .UserProfiles
            .FirstOrDefault(u => u.IdentityUserId == currentUserId);

        if (userProfile == null)
        {
            return Unauthorized();
        }

        List<Post> userPosts = _dbContext
            .Posts
            .Where(p => p.AuthorId == userProfile.Id)
            .OrderByDescending(p => p.PublishingDate)
            .ToList();

        return Ok(userPosts);
    }

    // PUT: api/Post/{id}
    /*
    {
    "id": 2,
    "title": "Updated Post Title",
    "subTitle": "Updated subtitle",
    "categoryId": 2,
    "headerImageUrl": "https://example.com/images/updated-image.jpg",
    "body": "This is the updated body content of the post. It has been revised for clarity and depth.",
    "authorId": 2
    }
    */
    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdatePost(Post post, int id)
    {
        Post postToUpdate = _dbContext.Posts.SingleOrDefault(p => p.Id == id);

        if (postToUpdate == null)
        {
            return NotFound();
        }
        else if (id != post.Id)
        {
            return BadRequest();
        }

        // Only update editable fields
        postToUpdate.Title = post.Title;
        postToUpdate.SubTitle = post.SubTitle;
        postToUpdate.CategoryId = post.CategoryId;
        postToUpdate.HeaderImageUrl = post.HeaderImageUrl;
        postToUpdate.Body = post.Body;
        postToUpdate.AuthorId = post.AuthorId;

        _dbContext.SaveChanges();

        return NoContent();
    }


}
