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
}
