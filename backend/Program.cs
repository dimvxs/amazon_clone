using backend.BLL.Infrastructure;
using backend.BLL.Interfaces;
using backend.BLL.Profiles;
using backend.BLL.Services;
using backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

var connectionString = configuration.GetConnectionString("DefaultConnection");
services.AddAmazonContext(connectionString);
services.AddUnitOfWorkService();

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(MappingProfile));

services.AddScoped<IAddressService, AddressService>();
services.AddScoped<ICartItemService, CartItemService>();
services.AddScoped<ICategoryService, CategoryService>();
services.AddScoped<ICreditCardService, CreditCardService>();
services.AddScoped<IFilterService, FilterService>();
services.AddScoped<IFilterValueService, FilterValueService>();
services.AddScoped<IOrderService, OrderService>();
services.AddScoped<IOrderItemService, OrderItemService>();
services.AddScoped<IProductService, ProductService>();
services.AddScoped<IProductImageService, ProductImageService>();
services.AddScoped<IReviewService, ReviewService>();
services.AddScoped<IRoleService, RoleService>();
services.AddScoped<IUserService, UserService>();
services.AddScoped<IWishlistService, WishlistService>();
services.AddControllers();

services.AddLogging();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();