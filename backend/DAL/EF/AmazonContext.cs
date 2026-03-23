using Microsoft.EntityFrameworkCore;
using DefaultNamespace;

namespace backend.DAL.EF
{
    public class AmazonContext : DbContext
    {
        public DbSet<Address> T_Address { get; set; }
        public DbSet<CartItem> T_CartItem { get; set; }
        public DbSet<Category> T_Category { get; set; }
        public DbSet<CreditCard> T_CreditCard { get; set; }
        public DbSet<Filter> T_Filter { get; set; }
        public DbSet<FilterValue> T_FilterValue { get; set; }
        public DbSet<Order> T_Order { get; set; }
        public DbSet<OrderItem> T_OrderItem { get; set; }
        public DbSet<Product> T_Product { get; set; }
        public DbSet<ProductImage> T_ProductImage { get; set; }
        public DbSet<Review> T_Review { get; set; }
        public DbSet<Role> T_Role { get; set; }
        public DbSet<User> T_User { get; set; }
        public DbSet<Wishlist> T_Wishlist { get; set; }
        public DbSet<WishlistItem> T_WishlistItem { get; set; }

        public AmazonContext(DbContextOptions<AmazonContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>().HasKey(c => new {c.CategoryId, c.ProductId});
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
