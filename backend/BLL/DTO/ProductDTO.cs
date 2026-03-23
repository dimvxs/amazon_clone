namespace backend.BLL.DTO;

public class ProductDTO
{
    // Основные свойства
    public long Id { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Color { get; set; }
    public double Price { get; set; }
    public double Weight { get; set; }
    public bool Available { get; set; }
}