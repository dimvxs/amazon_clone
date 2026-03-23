using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IFilterService
{
    Task Create(FilterDTO entity);
    Task Update(FilterDTO entity);
    Task Delete(int id);
    Task<FilterDTO> Get(int id);
    Task<IEnumerable<FilterDTO>> GetAll();
}