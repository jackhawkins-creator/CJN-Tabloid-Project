using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Tabloid.Data;


namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private TabloidDbContext _dbContext;


    public TagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var Tags = _dbContext.Tags;
        return Ok(Tags);
    }
}