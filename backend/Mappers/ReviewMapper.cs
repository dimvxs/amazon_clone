using System.Net.NetworkInformation;
using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewGetDTO ToGetDto(this Review review)
        {
            if (review == null) return null;
            return new ReviewGetDTO
            {
                Id = review.Id,
                UserName = review.User.Name,
                Title = "TempTitle", //Временно
                Date = review.CreatedAt,
                Country = review.User.Country,
                FullText = review.Comment,
                HelpfulCount = 5, //Временно
                Images = new List<string>()
            };
        }
        public static IEnumerable<ReviewGetDTO> MapToDtoList(this IEnumerable<Review> review)
        {
            return review.Select(r => r.ToGetDto());
        }
    }
}
