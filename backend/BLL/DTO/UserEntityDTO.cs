namespace DefaultNamespace;

public class UserEntityDTO
{
        public string Email { get; set; }
        public string HashPassword { get; set; }
        public string Salt { get; set; }
        public int RoleId { get; set; } 
}