using backend.DAL.EF;
using backend.DAL.Interfaces;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AmazonContext _context;
        private readonly DbSet<Product> _dbSet;

        public ProductRepository(AmazonContext context)
        {
            _context = context;
            _dbSet = _context.Set<Product>();
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _dbSet.Include(p => p.Images).Include(p => p.Reviews).ThenInclude(r => r.User).Include(p => p.Reviews).ThenInclude(r => r.ReviewImages).ToListAsync();
        }

        public async Task<Product?> GetById(long id)
        {
            var list = await _dbSet.Include(p => p.Images).Include(p => p.Reviews).ThenInclude(r => r.User).Include(p => p.Reviews).ThenInclude(r => r.ReviewImages).Where(p => p.Id == id).ToListAsync();
            return list.FirstOrDefault();
        }

        public Task Add(Product entity)
        {
            // Только добавляем в контекст, не сохраняем сразу
            return _dbSet.AddAsync(entity).AsTask();
        }

        public Task Update(Product entity)
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
