using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilterValueController : ControllerBase
    {
        private readonly IFilterValueService _service;

        public FilterValueController(IFilterValueService service)
        {
            _service = service;
        }

        // GET: api/filtervalue
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilterValueDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/filtervalue/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FilterValueDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/filtervalue
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] FilterValueDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/filtervalue/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] FilterValueDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/filtervalue/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
