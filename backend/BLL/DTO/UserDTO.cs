namespace backend.BLL.DTO;

public class UserDTO
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string HashPassword { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }

    public long RoleId { get; set; }
}