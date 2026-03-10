namespace DefaultNamespace;

public class Product
{
    // Основные свойства
    public long Id { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Color { get; set; }
    public double Price { get; set; }
    public double Weight { get; set; }
    public bool Available { get; set; }

    // Навигационные свойства
    public List<ProductCategory> ProductCategories { get; set; } = new();
    public List<ProductImage> Images { get; set; } = new();

    // Пустой конструктор (для EF Core)
    public Product() { }

    // Конструктор с основными полями
    public Product(string name, string brand, string color, double price, double weight, bool available)
    {
        Name = name;
        Brand = brand;
        Color = color;
        Price = price;
        Weight = weight;
        Available = available;
    }

    // Методы для работы с категориями и изображениями
    public void AddCategory(ProductCategory category)
    {
        ProductCategories.Add(category);
    }

    public void AddImage(ProductImage image)
    {
        Images.Add(image);
    }
}