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

    //Create Post
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
    public IActionResult CreateWorkOrder(Post post)
    {
        post.PublishingDate = DateTime.Now;
        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();
        return Created($"/api/post/{post.Id}", post);
    }
}
