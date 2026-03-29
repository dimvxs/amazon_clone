namespace DefaultNamespace;

public class Review
{
    public long Id { get; set; }

    public int Rating { get; set; } 

    public string Comment { get; set; }

    public DateTime CreatedAt { get; set; }

    // пользователь
    public long UserId { get; set; }
    public User User { get; set; }

    // товар
    public long ProductId { get; set; }
    public Product Product { get; set; }

    public Review() { }

    public Review(int rating, string comment, long userId, long productId)
    {
        Rating = rating;
        Comment = comment;
        UserId = userId;
        ProductId = productId;
        CreatedAt = DateTime.UtcNow;
    }
}