using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IFilterValueService
{
    Task Create(FilterValueDTO entity);
    Task Update(FilterValueDTO entity);
    Task Delete(int id);
    Task<FilterValueDTO> Get(int id);
    Task<IEnumerable<FilterValueDTO>> GetAll();
}