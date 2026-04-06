namespace DefaultNamespace;

public class ProductReviewsDTO
{
        
        // Главный контейнер для отзывов товара
        //         содержит:
        // ProductId — к какому товару относятся отзывы
        //         Reviews — список всех отзывов
        //         ReviewStats — общая статистика
        //  Используется как ответ API:
        // GET /products/{id}/reviews
  
        public string ProductId { get; set; }
        public List<ReviewDto> Reviews { get; set; }
        public ReviewStatsDto ReviewStats { get; set; }
    
}