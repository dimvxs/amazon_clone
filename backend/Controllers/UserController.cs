using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using DefaultNamespace;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly PasswordCache _passwordCache;
       
        public UserController(IUserService service, PasswordCache passwordCache)
        {
            _service = service;
            _passwordCache = passwordCache;
            
        }
        
        
        // [HttpPost("login")]
        // public async Task<IActionResult> Login([FromBody] LoginDto dto)
        // {
        //     var user = await _service.GetByEmail(dto.Email);
        //
        //     if (user == null)
        //         return Unauthorized("Invalid email or password");
        //
        //     var cached = _passwordCache.GetCachedPassword(dto.Email);
        //
        //     if (cached != null)
        //     {
        //         if (PasswordHelper.VerifyPassword(dto.Password, cached.Hash, cached.Salt))
        //             return Ok("Success");
        //
        //         return Unauthorized("Invalid email or password");
        //     }
        //
        //     var hash = Convert.FromBase64String(user.HashPassword);
        //     var salt = Convert.FromBase64String(user.Salt);
        //
        //     if (PasswordHelper.VerifyPassword(dto.Password, hash, salt))
        //     {
        //         _passwordCache.CachePassword(dto.Email, hash, salt, TimeSpan.FromMinutes(10));
        //         return Ok("Success");
        //     }
        //
        //     return Unauthorized("Invalid email or password");
        // }

        // GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }
        
        [HttpPost("sign-up")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            await _service.Register(dto);
            return Ok("User registered");
        }
        
    

        // GET: api/user/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetById(int id)
        {
            var result = await _service.Get(id);
            return Ok(result);
        }

        // POST: api/user
        // [HttpPost]
        // public async Task<ActionResult> Create([FromBody] UserDTO entity)
        // {
        //     await _service.Create(entity);
        //
        //     return CreatedAtAction(
        //         nameof(GetById),
        //         new { id = entity.Id },
        //         entity
        //     );
        // }

        // PUT: api/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserDTO entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _service.Update(entity);
            return NoContent();
        }

        // DELETE: api/user/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.Delete(id);
            return NoContent();
        }
    }
}
