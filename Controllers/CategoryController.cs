using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;

using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Models.DTOs;


namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private TabloidDbContext _dbContext;


    public CategoryController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var Categories = _dbContext.Categories;
        return Ok(Categories);
    }

    [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        var Category = _dbContext.Categories.SingleOrDefault(p => p.Id == id);
        if (Category == null) return NotFound();

        _dbContext.Categories.Remove(Category);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CategoryDTO dto)
    {
        var PostCategory = new Category
        {
            Id = dto.Id,
            Name = dto.Name
           

        };

        _dbContext.Categories.Add(PostCategory);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/order/{PostCategory.Id}", dto);
    }

}