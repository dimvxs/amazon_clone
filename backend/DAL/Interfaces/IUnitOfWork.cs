
using backend.Models;
using DefaultNamespace;


namespace backend.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<Address> R_Address { get; }
        IRepository<CartItem> R_CartItem { get; }
        IRepository<Category> R_Category { get; }
        IRepository<CreditCard> R_CreditCard { get; }
        IRepository<Filter> R_Filter { get; }
        IRepository<FilterValue> R_FilterValue { get; }
        IRepository<Order> R_Order { get; }
        IRepository<OrderItem> R_OrderItem { get; }
        IRepository<Product> R_Product { get; }
        IRepository<ProductImage> R_ProductImage { get; }
        IRepository<Review> R_Review { get; }
        IRepository<Role> R_Role { get; }
        IRepository<User> R_User { get; }
        IRepository<Wishlist> R_Wishlist { get; }
        IRepository<ReviewImages> R_ReviewImages { get; }

        Task SaveAsync();
    }
}
