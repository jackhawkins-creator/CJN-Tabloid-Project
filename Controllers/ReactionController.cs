using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Tabloid.Data;
using Tabloid.Models;


namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;


    public ReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var Reactions = _dbContext.Reactions;
        return Ok(Reactions);
    }

    //POST Reaction
    //Raw Body Test Data:
    /*
    {
  "postId": 1,
  "userProfileId": 2,
  "emoji": "🔥"
    }
    */
    [HttpPost]
    //[Authorize]
    public IActionResult CreateReaction(Reaction reaction)
    {
        reaction.ReactedOn = DateTime.Now;
        _dbContext.Reactions.Add(reaction);
        _dbContext.SaveChanges();
        return Created($"/api/reaction/{reaction.Id}", reaction);
    }

    //DELETE Reaction
    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeleteReaction(int id)
    {
        Reaction reaction = _dbContext.Reactions.SingleOrDefault(r => r.Id == id);

        if (reaction == null)
        {
            return NotFound();
        }

        _dbContext.Reactions.Remove(reaction);
        _dbContext.SaveChanges();

        return NoContent();
    }
}