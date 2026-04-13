using backend.BLL.DTO;

namespace backend.BLL.Interfaces;

public interface IReviewService
{
    Task Create(ReviewDTO entity);
    Task Update(ReviewDTO entity);
    Task Delete(int id);
    Task<ReviewDTO> Get(int id);
    Task<IEnumerable<ReviewDTO>> GetAll();
    Task<IEnumerable<ReviewGetDTO>> GetAllProductReview();
}