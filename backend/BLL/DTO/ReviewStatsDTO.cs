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

      
        public List<RatingItemDTO> RatingCounts { get; set; }


    public Dictionary<int, int> RatingBreakdown =>
        RatingCounts?
        .Select((item, index) => new { Stars = index + 1, Count = item.Count }) // Берем свойство Count из объекта
        .ToDictionary(x => x.Stars, x => x.Count)
        ?? new Dictionary<int, int>();

}