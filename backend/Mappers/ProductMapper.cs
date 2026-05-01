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

            MaxQuantity = product.MaxQuantity,
            InStock = product.Available,
            Warranty = product.Warranty,

            Description = product.Description,
            AboutItems = product.Metadata?.AboutItems ?? new List<string>(),

            ProductInfo = product.Metadata.Attribute.Select(kvp => new AttributesDTO
            {
                Label = kvp.Key,
                Value = kvp.Value
            }).ToList(),

            ActionsSection = MapActions(),
        };
    }

    // --- Разбивка на методы ---

    public static ImagesDTO MapImages(Product product)
    {
        return new ImagesDTO
        {
            Main = product.Images.Where(i => i.IsMain).Select(i => i.ImageUrl).FirstOrDefault(),
            Thumbnails = product.Images.Where(i => !i.IsMain).Select(i => i.ImageUrl).ToList()
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

        return Math.Round(product.Reviews.Average(r => r.Rating), 1); // зависит от Review
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
}