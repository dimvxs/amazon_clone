using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IUserService
{
    Task Create(UserDTO entity);
    Task Update(UserDTO entity);
    Task Delete(int id);
    Task<UserDTO> Get(int id);
    Task<UserDTO?> GetByEmail(string email);
    Task<IEnumerable<UserDTO>> GetAll();
}