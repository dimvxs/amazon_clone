using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilterController : ControllerBase
    {
        private readonly IFilterService _service;

        public FilterController(IFilterService service)
        {
            _service = service;
        }

        // GET: api/filter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilterDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/filter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilterDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/filter
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] FilterDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/filter/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] FilterDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/filter/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
