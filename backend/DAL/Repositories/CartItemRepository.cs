using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<CartItem> _dbSet;

        public CartItemRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<CartItem>();
        }

        public async Task<IEnumerable<CartItem>> GetAll()
        {
            return await _dbSet.Include(c => c.Product).ThenInclude(p => p.Images).Include(c => c.User).ToListAsync();
        }

        public async Task<CartItem?> GetById(long id)
        {
            var list = await _dbSet.Include(c => c.Product).ThenInclude(p => p.Images).Include(c => c.User).Where(c => c.Id == id).ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(CartItem entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(CartItem entity)
        {
            _dbSet.Update(entity);
            return Task.CompletedTask;
        }

        public Task Delete(long id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
                _dbSet.Remove(entity);
            return Task.CompletedTask;
        }
        public async Task SaveAsync()
        {
            // Сохраняем все изменения разом
            await _context.SaveChangesAsync();
        }
    }
}
