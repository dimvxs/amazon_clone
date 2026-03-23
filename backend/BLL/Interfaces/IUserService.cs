using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IUserService
{
    Task Create(UserDTO entity);
    Task Update(UserDTO entity);
    Task Delete(int id);
    Task<UserDTO> Get(int id);
    Task<IEnumerable<UserDTO>> GetAll();
}