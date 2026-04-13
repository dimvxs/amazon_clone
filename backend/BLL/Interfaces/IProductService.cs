using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.BLL.Interfaces;

public interface IProductService
{
    Task Create(ProductDTO entity);
    Task Update(ProductDTO entity);
    Task Delete(int id);
    Task<ProductDTO> Get(int id);
    Task<IEnumerable<ProductDTO>> GetAll();
    Task<IEnumerable<ProductCatalogGetDTO>> GetAllCatalog();
    Task<ProductGetDTO> GetPageProduct(int id);
    Task<ProductReviewsDTO> GetProductReview(int id);
}