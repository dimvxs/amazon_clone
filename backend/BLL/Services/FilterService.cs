using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class FilterService : IFilterService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<FilterService> logger;

    public FilterService(IUnitOfWork db, IMapper mapper, ILogger<FilterService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(FilterDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in FilterService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Filter.Add(mapper.Map<Filter>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Filter in FilterService");
            throw new ApplicationException("Error adding Filter", ex);
        }
    }

    public async Task Update(FilterDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in FilterService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in FilterService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Filter.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Filter with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Filter with ID {entity.Id} not found");
            }

            await db.R_Filter.Update(mapper.Map<Filter>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Filter with ID {Id} in FilterService", entity.Id);
            throw new ApplicationException("Error updating Filter", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in FilterService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Filter.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Filter with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Filter with ID {id} not found");
            }

            await db.R_Filter.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Filter with ID {Id} in FilterService", id);
            throw new ApplicationException("Error deleting Filter", ex);
        }
    }

    public async Task<FilterDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in FilterService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Filter.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Filter with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Filter with ID {id} not found");
            }

            return mapper.Map<FilterDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Filter with ID {Id} in FilterService", id);
            throw new ApplicationException("Error getting Filter", ex);
        }
    }

    public async Task<IEnumerable<FilterDTO>> GetAll()
    {
        try
        {
            var filters = await db.R_Filter.GetAll();
            if (filters == null)
            {
                logger.LogWarning("GetAll returned null in FilterService");
                return Enumerable.Empty<FilterDTO>();
            }

            return mapper.Map<IEnumerable<FilterDTO>>(filters);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in FilterService");
            throw new ApplicationException("Error in GetAll function for Filter", ex);
        }
    }
}