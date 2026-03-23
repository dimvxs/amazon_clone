using Microsoft.EntityFrameworkCore;
using backend.DAL.EF;
namespace backend.BLL.Infrastructure;

public static class AmazonContextExtensions
{
    public static void AddAmazonContext(this IServiceCollection services, string connection)
    {
        services.AddDbContext<AmazonContext>(options => options.UseMySql(connection,ServerVersion.AutoDetect(connection)));
    }
}