using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public class HomepageMapper
    {
        public static HomepageDTO toHomePageDTO(List<Product> products, List<Category> categories)
        {
            return new HomepageDTO
            {
                recommendedRow1 = new List<RecommendedRow1>
                {
                    new RecommendedRow1
                    {
                        Title = "Electronics & Gadgets",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                        }
                    },
                    new RecommendedRow1
                    {
                        Title = "Home & Kitchen",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                        }
                    },
                    new RecommendedRow1
                    {
                        Title = "Gaming & Entertainment",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                        }
                    },
                    new RecommendedRow1
                    {
                        Title = "Fashion & Accessories",
                        Items = new List<CategoryDTO>
                        {
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                        }
                    }
                },
                recommendedRow2 = new List<CategoryDTO>
                {
                    new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                            new CategoryDTO(categories[14]),
                },
                catalogSlider = products.Skip(0).Take(3).Select(p => p.ToCatalogDto()).ToList(),
                recommendedRow3 = new List<RecommendedRow3>
                {
                    new RecommendedRow3
                    {
                        Id = products[0].Id,
                        Type = "product",
                        Title = "Featured Product",
                        Name = products[0].Name,
                        price = products[0].Price,
                        images = products[0].Images.Select(i => i.ImageUrl).ToList(),
                    },
                    new RecommendedRow3
                    {
                        Id = categories[0].Id,
                        Type = "category",
                        Title = categories[0].Name,
                        imageSrc = categories[0].ImageUrl,
                    },
                    new RecommendedRow3
                    {
                        Id = products[0].Id,
                        Type = "product",
                        Title = "Top Deal",
                        Name = products[0].Name,
                        price = products[0].Price,
                        images = products[0].Images.Select(i => i.ImageUrl).ToList(),
                    },
                    new RecommendedRow3
                    {
                        Id = categories[0].Id,
                        Type = "category",
                        Title = categories[0].Name,
                        imageSrc = categories[0].ImageUrl,
                    },
                },
            };
        }
    }
}
