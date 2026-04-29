using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc.Infrastructure;

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
        
        
     [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDTO dto)
{
    var user = await _service.GetByEmail(dto.Email);

    if (user == null)
        return Unauthorized("Invalid email or password");

    var cached = _passwordCache.GetCachedPassword(dto.Email);

    // Логируем наличие кэша
    Console.WriteLine($"Cached: {cached != null}");

    if (cached != null)
    {
        if (PasswordHelper.VerifyPassword(dto.Password, cached.Hash, cached.Salt))
            return Ok("Success");

        return Unauthorized("Invalid email or password");
    }

    var hash = Convert.FromBase64String(user.HashPassword);
    var salt = Convert.FromBase64String(user.Salt);

    bool isValid = PasswordHelper.VerifyPassword(dto.Password, hash, salt);
    Console.WriteLine($"Password valid: {isValid}");

    if (isValid)
    {
        _passwordCache.CachePassword(dto.Email, hash, salt, TimeSpan.FromMinutes(10));
        HttpContext.Session.SetString("UserEmail", user.Email);
        HttpContext.Session.SetString("UserRole", user.RoleId.ToString());
        HttpContext.Session.SetString("UserId", user.Id.ToString());
                return Ok("Success");
    }

    return Unauthorized("Invalid email or password");
}
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
            var lowerEmail = dto.Email.ToLower().Trim();
            if (await _service.EmailExists(lowerEmail))
            {
                return NoContent();
            }
            else
            {
                await _service.Register(dto);
                return Ok(new { message = "User registered" });
            }
        }
        
    

        // GET: api/user/5
        [HttpGet("{id:int}")]
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

        [HttpGet("account")]
        public async Task<ActionResult<UserInfoDTO>> GetAccountInfo()
        {
            var uid = HttpContext.Session.GetString("UserId");
            if (int.TryParse(uid, out int userId))
            {

                var result = await _service.GetUserInfo(userId);
                return Ok(new { result });

            }
            else
            {
                return NoContent();
            }

        }
        [HttpGet("islogin")]
        public async Task<ActionResult<bool>> GetIsLogin()
        {
            var uid = HttpContext.Session.GetString("UserId");
            if (uid != null)
            {
                Console.WriteLine(true);
                return Ok(true);
                
            }
            else
            {
                Console.WriteLine(false);
                return Ok(false);
                
            }
        }

        [HttpPut("info")]
        public async Task<IActionResult> Update([FromBody] UpdateUserInfoDTO entity)
        {
            var uid = HttpContext.Session.GetString("UserId");
            var result = await _service.Get(int.Parse(uid));
            result.Name = entity.FirstName + " " + entity.LastName;
            result.Email = entity.Email;
            result.Phone = entity.Phone;
            result.HashPassword = entity.Password;
            await _service.Update(result);
            return NoContent();
        }

        [HttpGet("hasreview")]
        public async Task<ActionResult<bool>> HasReview(int productId)
        {
            var uid = HttpContext.Session.GetString("UserId");
            return await _service.HasReview(int.Parse(uid), productId);
        }
 
    }
}