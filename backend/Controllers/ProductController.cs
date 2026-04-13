using backend.BLL.DTO;
using backend.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        // GET: api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("catalog")]
        public async Task<ActionResult<IEnumerable<ProductCatalogGetDTO>>> GetAllCatalog()
        {
            var result = await _service.GetAllCatalog();
            return Ok(new { products = result });
        }

        [HttpGet("getpage/{id:int}")]
        public async Task<ActionResult<IEnumerable<ProductCatalogGetDTO>>> GetPageProduct(int id)
        {
            var result = await _service.GetPageProduct(id);
            return Ok(new { products = result });
        }
        [HttpGet("reviews/{id:int}")]
        public async Task<ActionResult<IEnumerable<ProductCatalogGetDTO>>> GetProductReview(int id)
        {
            var result = await _service.GetProductReview(id);
            return Ok(new { result });
        }

        // GET: api/product/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/product
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ProductDTO entity)
        {
            await _service.Create(entity);

            return CreatedAtAction(
                nameof(GetById),
                new { id = entity.Id },
                entity
            );
        }

        // PUT: api/product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
