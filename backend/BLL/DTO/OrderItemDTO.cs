namespace backend.BLL.DTO;

public class OrderItemDTO
{
    public long Id { get; set; }
    public long OrderId { get; set; }
    public long ProductId { get; set; }

    public int Quantity { get; set; }

}