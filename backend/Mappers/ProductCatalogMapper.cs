using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public static class ProductCatalogMapper
    {
        public static ProductCatalogGetDTO ToCatalogDto(this Product product)
        {
            return new ProductCatalogGetDTO
            {
                id = product.Id,
                title = product.Name,
                price = product.Price,
                rating = Math.Round(product.Reviews != null && product.Reviews.Any() ? product.Reviews.Average(r => r.Rating) : 0, 1),
                imageUrl = product.Images?.FirstOrDefault()?.ImageUrl ?? "placeholder.png"
            };
        }
        public static IEnumerable<ProductCatalogGetDTO> MapToDtoList(this IEnumerable<Product> products)
        {
            return products.Select(p => p.ToCatalogDto());
        }

        public static ProductReviewsDTO ToReviewDTO(this Product product)
        {
            if (product == null) return null;

            return new ProductReviewsDTO
            {
                ProductId = product.Id.ToString(),
                Reviews = product.Reviews?.MapToDtoList().ToList() ?? new List<ReviewGetDTO>(),
                ReviewStats = new ReviewStatsDTO
                {
                    AverageRating = Math.Round(product.Reviews != null && product.Reviews.Any() ? product.Reviews.Average(r => r.Rating) : 0, 1),
                    RatingCount = product.Reviews?.Count ?? 0,
                    RatingCounts = new List<RatingItemDTO>
                    {
                        new RatingItemDTO { Stars = 5, Count = 10 },
                        new RatingItemDTO { Stars = 4, Count = 5 },
                        new RatingItemDTO { Stars = 3, Count = 3 },
                        new RatingItemDTO { Stars = 2, Count = 2 },
                        new RatingItemDTO { Stars = 1, Count = 1 }
                    }
                }
            };
        }
    }
}
