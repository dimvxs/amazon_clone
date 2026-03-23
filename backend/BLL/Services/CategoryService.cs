using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class CategoryService : ICategoryService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<CategoryService> logger;

    public CategoryService(IUnitOfWork db, IMapper mapper, ILogger<CategoryService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(CategoryDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in CategoryService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Category.Add(mapper.Map<Category>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Category in CategoryService");
            throw new ApplicationException("Error adding Category", ex);
        }
    }

    public async Task Update(CategoryDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in CategoryService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in CategoryService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Category.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Category with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Category with ID {entity.Id} not found");
            }

            await db.R_Category.Update(mapper.Map<Category>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Category with ID {Id} in CategoryService", entity.Id);
            throw new ApplicationException("Error updating Category", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in CategoryService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Category.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Category with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Category with ID {id} not found");
            }

            await db.R_Category.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Category with ID {Id} in CategoryService", id);
            throw new ApplicationException("Error deleting Category", ex);
        }
    }

    public async Task<CategoryDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in CategoryService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Category.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Category with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Category with ID {id} not found");
            }

            return mapper.Map<CategoryDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Category with ID {Id} in CategoryService", id);
            throw new ApplicationException("Error getting Category", ex);
        }
    }

    public async Task<IEnumerable<CategoryDTO>> GetAll()
    {
        try
        {
            var categories = await db.R_Category.GetAll();
            if (categories == null)
            {
                logger.LogWarning("GetAll returned null in CategoryService");
                return Enumerable.Empty<CategoryDTO>();
            }

            return mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in CategoryService");
            throw new ApplicationException("Error in GetAll function for Category", ex);
        }
    }
}