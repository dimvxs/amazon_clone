namespace DefaultNamespace;

public class User
{
    // Основные свойства
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string HashPassword { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }

    // Роль
    public Role Role { get; set; }
    public long RoleId { get; set; }

    // Навигационные свойства
    public List<Address> Addresses { get; set; } = new();
    public List<CreditCard> Payments { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
    public List<CartItem> Cart { get; set; } = new();
    public List<Review> Reviews { get; set; } = new();
    
    public User() { }

    // Конструктор с основными полями
    public User(string name, string email, string hashPassword, string country, string phone, Role role)
    {
        Name = name;
        Email = email;
        HashPassword = hashPassword;
        Country = country;
        Phone = phone;
        Role = role;
        RoleId = role.Id; 
    }

    // Можно добавить метод для добавления адреса
    public void AddAddress(Address address)
    {
        Addresses.Add(address);
    }

    // Метод для добавления платежа
    public void AddPayment(CreditCard payment)
    {
        Payments.Add(payment);
    }

    // Метод для добавления заказа
    public void AddOrder(Order order)
    {
        Orders.Add(order);
    }

    // Метод для добавления элемента в корзину
    public void AddToCart(CartItem item)
    {
        Cart.Add(item);
    }
}