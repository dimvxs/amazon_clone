namespace DefaultNamespace;

public class ReviewStatsDTO
{
    // Сводка по всем отзывам
    // AverageRating — средний рейтинг
    // RatingCount — общее количество отзывов
    //     RatingCounts — сколько оценок каждого типа (1⭐–5⭐)
    //     📌 Нужно для:
    // звёздочек ⭐⭐⭐⭐⭐
    // графиков/баров рейтинга
        public double AverageRating { get; set; }
        public int RatingCount { get; set; }

      
        public List<RatingItemDto> RatingCounts { get; set; }

  
        public Dictionary<int, int> RatingBreakdown =>
            RatingCounts
                ?.Select((count, index) => new { Stars = index + 1, Count = count })
                .ToDictionary(x => x.Stars, x => x.Count);
    
}