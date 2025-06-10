using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Models.DTOs;


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

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TagDTO dto)
    {
        var NewTag = new Tag
        {
            Id = dto.Id,
            Name = dto.Name
        };

        _dbContext.Tags.Add(NewTag);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/order/{NewTag.Id}", dto);
    }

    [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        var Tag = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
        if (Tag == null) return NotFound();

        _dbContext.Tags.Remove(Tag);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]

    public IActionResult UpdateOrder(Tag tag, int id)
    {
        Tag TagToUpdate = _dbContext.Tags.SingleOrDefault(t => t.Id == id);
        if (TagToUpdate == null)
        {
            return NotFound();
        }
        else if (id != tag.Id)
        {
            return BadRequest();
        }

        //These are the only properties that we want to make editable
        TagToUpdate.Name = tag.Name;



        _dbContext.SaveChanges();

        return NoContent();
    }
    
    [HttpGet("{id}")]
    
    public IActionResult GetById(int id)
    {
        var tag = _dbContext.Tags.SingleOrDefault(t => t.Id == id);

        if (tag == null)
        {
            return NotFound();
        }

        return Ok(tag);
    }
}