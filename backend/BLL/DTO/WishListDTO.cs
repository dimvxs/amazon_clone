namespace backend.BLL.DTO;

public class WishlistDTO
{
    public long Id { get; set; }

    // внешний ключ пользовател€
    public long UserId { get; set; }

    // им€ списка (например: "Birthday", "Electronics")
    public string Name { get; set; }
}