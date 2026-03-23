using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface ICartItemService
{
    Task Create(CartItemDTO entity);
    Task Update(CartItemDTO entity);
    Task Delete(int id);
    Task<CartItemDTO> Get(int id);
    Task<IEnumerable<CartItemDTO>> GetAll();
}