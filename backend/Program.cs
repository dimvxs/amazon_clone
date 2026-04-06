using Amazon.S3;
using backend.DAL.Interfaces;
using backend.DAL.Repositories;
using backend.BLL.Infrastructure;
using backend.BLL.Interfaces;
using backend.BLL.Profiles;
using backend.BLL.Services;
using backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using DefaultNamespace;

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
services.AddScoped<IUserRepository, UserRepository>(); 
services.AddScoped<IUserService, UserService>();
services.AddScoped<IWishlistService, WishlistService>();
builder.Services.AddScoped<IFileStorageService, S3StorageService>();
builder.Services.AddScoped<PasswordCache>();
services.AddControllers();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File(
        "logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7)
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // разрешенные домены
            .AllowAnyHeader()                  // разрешить любые заголовки
            .AllowAnyMethod()                  // разрешить любые методы (GET, POST...)
            .AllowCredentials();               // куки
    });
});

builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();

    return new AmazonS3Client(
        config["AWS:AccessKey"],
        config["AWS:SecretKey"],
        Amazon.RegionEndpoint.EUCentral1
    );
});

builder.Services.Configure<AwsOptions>(builder.Configuration.GetSection("AWS"));

builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddControllers();
// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();                
    app.UseSwaggerUI(c =>            
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("MyCorsPolicy");


app.MapControllers();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();