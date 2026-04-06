using backend.Models;
using backend.DAL.Interfaces;
using DefaultNamespace;

namespace backend.DAL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmail(string email);

        Task<IEnumerable<User>> GetAll();
        Task<User?> GetById(long id);
        Task Add(User entity);
        Task Update(User entity);
        Task Delete(long id);
        Task SaveAsync();
    }
}