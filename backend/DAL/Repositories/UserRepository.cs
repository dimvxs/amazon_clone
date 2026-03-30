namespace DefaultNamespace;

public class UserRepository<T>: IRepository<T> where T : class
{
    protected readonly DbContext context;
    protected readonly DbSet<T> dbSet;

    public UserRepository(DbContext context)
    {
        this.context = context;
        dbSet = context.Set<T>();
    }

    public async Task<T?> GetByEmail(string email)
    {
        return await dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }
    
    
}