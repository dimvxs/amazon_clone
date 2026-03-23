using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;

namespace backend.DAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private readonly AmazonContext context;

        public IRepository<Address> R_Address { get; }
        public IRepository<CartItem> R_CartItem { get; }
        public IRepository<Category> R_Category { get; }
        public IRepository<CreditCard> R_CreditCard { get; }
        public IRepository<Filter> R_Filter { get; }
        public IRepository<FilterValue> R_FilterValue { get; }
        public IRepository<Order> R_Order { get; }
        public IRepository<OrderItem> R_OrderItem { get; }
        public IRepository<Product> R_Product { get; }
        public IRepository<ProductImage> R_ProductImage { get; }
        public IRepository<Review> R_Review { get; }
        public IRepository<Role> R_Role { get; }
        public IRepository<User> R_User { get; }
        public IRepository<Wishlist> R_Wishlist { get; }
        public IRepository<WishlistItem> R_WishlistItem { get; }

        public EFUnitOfWork(AmazonContext context)
        {
            this.context = context;
            R_Address = new GenericRepository<Address>(context);
            R_CartItem = new GenericRepository<CartItem>(context);
            R_Category = new GenericRepository<Category>(context);
            R_CreditCard = new GenericRepository<CreditCard>(context);
            R_Filter = new GenericRepository<Filter>(context);
            R_FilterValue = new GenericRepository<FilterValue>(context);
            R_Order = new GenericRepository<Order>(context);
            R_OrderItem = new GenericRepository<OrderItem>(context);
            R_Product = new GenericRepository<Product>(context);
            R_ProductImage = new GenericRepository<ProductImage>(context);
            R_Review = new GenericRepository<Review>(context);
            R_Role = new GenericRepository<Role>(context);
            R_User = new GenericRepository<User>(context);
            R_Wishlist = new GenericRepository<Wishlist>(context);
            R_WishlistItem = new GenericRepository<WishlistItem>(context);
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
