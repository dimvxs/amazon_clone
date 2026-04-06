using backend.BLL.DTO;
using backend.Models;
using DefaultNamespace;
namespace backend.BLL.Interfaces;

public interface IUserService
{
    Task Create(UserDTO entity);
    // Task Create(RegisterDTO entity);
    Task Register(RegisterDTO dto);
    Task Update(UserDTO entity);
    Task Delete(int id);
    Task<UserDTO> Get(int id);
    Task<UserEntityDTO?> GetByEmail(string email);
    Task<IEnumerable<UserDTO>> GetAll();

}