using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IProductService
{
    Task Create(ProductDTO entity);
    Task Update(ProductDTO entity);
    Task Delete(int id);
    Task<ProductDTO> Get(int id);
    Task<IEnumerable<ProductDTO>> GetAll();
}