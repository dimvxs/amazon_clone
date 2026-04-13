using backend.BLL.DTO;
namespace DefaultNamespace;

public static class ProductMapper
{
    public static ProductGetDTO ToPageDto(this Product product)
    {
        return new ProductGetDTO
        {
            Id = product.Id,
            Title = product.Name,
            StoreLink = "/store", 

            Images = MapImages(product),

            Rating = MapRating(product),
            RatingCount = product.Reviews.Count,

            Price = MapPrice(product),

            MaxQuantity = 5, // временно
            InStock = product.Available,

            Description = product.Description,
            AboutItems = new List<string>(),   

            ActionsSection = MapActions(),

            ProductInfo = MapProductInfo(product)
        };
    }

    // --- Разбивка на методы ---

    public static ImagesDTO MapImages(Product product)
    {
        return new ImagesDTO
        {
            Main = product.Images.FirstOrDefault()?.ImageUrl,
            Thumbnails = product.Images.Select(i => i.ImageUrl).ToList()
        };
    }

    public static PriceDTO MapPrice(Product product)
    {
        var discount = product.Sale ?? 0;

        return new PriceDTO
        {
            ListPrice = (decimal)product.Price,
            DiscountPercent = discount,
            CurrentPrice = (decimal)(product.Price * (1 - discount / 100.0))
        };
    }

    public static double MapRating(Product product)
    {
        if (product.Reviews == null || product.Reviews.Count == 0)
            return 0;

        return product.Reviews.Average(r => r.Rating); // зависит от Review
    }

    public static ActionsDTO MapActions()
    {
        return new ActionsDTO
        {
            DeliveryText = "FREE delivery",
            DeliveryDate = "Monday, February",
            ShippingLocation = "Unknown",
            Shipper = "Amazon",
            Returns = "FREE 30-day refund",
            Payment = "Secure transaction"
        };
    }

    public static List<ProductInfoItemDTO> MapProductInfo(Product product)
    {
        return new List<ProductInfoItemDTO>
        {
            new ProductInfoItemDTO { Label = "Brand", Value = product.Brand },
            new ProductInfoItemDTO { Label = "Color", Value = product.Color },
            new ProductInfoItemDTO { Label = "Weight", Value = product.Weight?.ToString() }
        };
    }
}