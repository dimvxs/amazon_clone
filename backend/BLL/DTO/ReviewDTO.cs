namespace backend.BLL.DTO;

public class ReviewDTO
{ 
    public long Id { get; set; }
    public int Rating { get; set; }
    public string Title { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public long UserId { get; set; }
    public long ProductId { get; set; }
}

public class CreateReviewDTO
{
    public int Rating { get; set; }
    public string title { get; set; }
    public string review { get; set; }
    public long ProductId { get; set; }
}


public class ReviewGetDTO
{
    
    // Один конкретный отзыв пользователя
    // кто написал (UserName)
    // заголовок (Title)
    // текст (FullText)
    // дата (Date)
    // страна (Country)
    // лайки (HelpfulCount)
    // картинки (Images)
    public long Id { get; set; }
    public string UserName { get; set; }
    public string Title { get; set; }

    public DateTime Date { get; set; }
    public string Country { get; set; }

    public string FullText { get; set; }

    public int HelpfulCount { get; set; }

    public List<string> Images { get; set; }
    
    public string ShortText => FullText?.Length > 100
        ? FullText.Substring(0, 100) + "..."
        : FullText;

    public string FormattedDate => Date.ToString("dd MMM yyyy");
}