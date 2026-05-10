namespace DefaultNamespace;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAll();
    Task<Order?> GetById(long id);
}