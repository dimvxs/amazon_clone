namespace DefaultNamespace;

public class CartDTO
{
    public List<CartItemDTO> Items { get; set; }
    public decimal Shipping { get; set; }
    
    public decimal TotalPrice => Items.Sum(i => i.Price * i.Quantity) + Shipping;
}

public class CartItemDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public bool InStock { get; set; }
    public string Image { get; set; }
    
    public decimal Total => Price * Quantity;
}