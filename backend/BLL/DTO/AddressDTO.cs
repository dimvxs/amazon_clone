namespace backend.BLL.DTO;

public class AddressDTO
{
    public long Id { get; set; }

    public string Country { get; set; }

    public string City { get; set; }

    public string Street { get; set; }

    public string PostalCode { get; set; }

    public int HouseNumber { get; set; }

    public bool IsDefault { get; set; }

    public long UserId { get; set; }
}

public class AddressInfoDTO
{
    public string Street { get; set; }
    public int HouseNumber { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
}