using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _service;
        public AddressController(IAddressService service)
        {
            _service = service;
        }
        // GET: api/address
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }
        // GET: api/address/id
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }
        // POST: api/address
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] AddressDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }
        // PUT: api/address/id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AddressDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }
        // DELETE: api/address/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
