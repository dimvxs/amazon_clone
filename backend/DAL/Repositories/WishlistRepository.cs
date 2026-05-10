namespace DefaultNamespace;

using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;


public class WishlistRepository : IWishlistRepository
{
    private readonly ApplicationDbContext context;

    public WishlistRepository(ApplicationDbContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<Wishlist>> GetAll()
    {
        return await context.Wishlists
            .Include(w => w.Items)
            .ThenInclude(i => i.Product)
            .ThenInclude(p => p.Images)
            .ToListAsync();
    }

    public async Task<Wishlist?> GetById(long id)
    {
        return await context.Wishlists
            .Include(w => w.Items)
            .ThenInclude(i => i.Product)
            .ThenInclude(p => p.Images)
            .FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task Add(Wishlist entity)
    {
        await context.Wishlists.AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task Update(Wishlist entity)
    {
        context.Wishlists.Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task Delete(long id)
    {
        var entity = await context.Wishlists.FindAsync(id);

        if (entity == null)
        {
            return;
        }

        context.Wishlists.Remove(entity);
        await context.SaveChangesAsync();
    }
}
