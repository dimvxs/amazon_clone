using backend.BLL.DTO;
using backend.BLL.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _service;

        public CartItemController(ICartItemService service)
        {
            _service = service;
        }

        // GET: api/cartitem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItemDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        // GET: api/cartitem/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CartItemDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/cartitem
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CartItemDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/cartitem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CartItemDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/cartitem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }

        [HttpGet("cart")]
        public async Task<ActionResult<IEnumerable<CartDTO>>> GetAllCart()
        {
            var res = await _service.GetAllPage();
            var items = new CartDTO()
            {
                Items = res.ToList(),
                Shipping = 10,
            };
            return Ok(items);
        }
    }
}
