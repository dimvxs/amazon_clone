using System.Reflection.PortableExecutable;

namespace backend.BLL.DTO;

public class ProductDTO
{
    public long Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public string Warranty { get; set; }
    public int MaxQuantity { get; set; }
    public int? Sale { get; set; }
    public bool Available { get; set; }
    public ProductMetadataDTO Metadata { get; set; }
}

public class ProductCatalogGetDTO
{
    public long id { get; set; }
    public string title { get; set; }
    public double price { get; set; }
    public double rating { get; set; }
    public string imageUrl { get; set; }
}

public class ProductGetDTO
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string StoreLink { get; set; }

    public ImagesDTO Images { get; set; }

    public double Rating { get; set; }
    public int RatingCount { get; set; }

    public PriceDTO Price { get; set; }

    public int MaxQuantity { get; set; }
    public bool InStock { get; set; }

    public string Warranty { get; set; }
    public string Description { get; set; }

    public List<string> AboutItems { get; set; }

    public ActionsDTO ActionsSection { get; set; }

    public List<AttributesDTO> ProductInfo { get; set; }

    public bool HasDiscount => Price?.DiscountPercent > 0;

    public string ShortTitle => Title?.Length > 50 
        ? Title.Substring(0, 50) + "..." 
        : Title;
}