using System.ComponentModel.DataAnnotations;

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

public class UserInfoDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Avatar { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Country { get; set; }
    public string Dob { get; set; }
    public AddressInfoDTO Address { get; set; }
}

public class UpdateUserInfoDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Dob { get; set; }
}
