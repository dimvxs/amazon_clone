using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class FilterValueService : IFilterValueService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<FilterValueService> logger;

    public FilterValueService(IUnitOfWork db, IMapper mapper, ILogger<FilterValueService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(FilterValueDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in FilterValueService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_FilterValue.Add(mapper.Map<FilterValue>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding FilterValue in FilterValueService");
            throw new ApplicationException("Error adding FilterValue", ex);
        }
    }

    public async Task Update(FilterValueDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in FilterValueService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in FilterValueService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_FilterValue.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("FilterValue with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"FilterValue with ID {entity.Id} not found");
            }

            await db.R_FilterValue.Update(mapper.Map<FilterValue>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating FilterValue with ID {Id} in FilterValueService", entity.Id);
            throw new ApplicationException("Error updating FilterValue", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in FilterValueService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_FilterValue.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("FilterValue with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"FilterValue with ID {id} not found");
            }

            await db.R_FilterValue.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting FilterValue with ID {Id} in FilterValueService", id);
            throw new ApplicationException("Error deleting FilterValue", ex);
        }
    }

    public async Task<FilterValueDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in FilterValueService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_FilterValue.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("FilterValue with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"FilterValue with ID {id} not found");
            }

            return mapper.Map<FilterValueDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting FilterValue with ID {Id} in FilterValueService", id);
            throw new ApplicationException("Error getting FilterValue", ex);
        }
    }

    public async Task<IEnumerable<FilterValueDTO>> GetAll()
    {
        try
        {
            var values = await db.R_FilterValue.GetAll();
            if (values == null)
            {
                logger.LogWarning("GetAll returned null in FilterValueService");
                return Enumerable.Empty<FilterValueDTO>();
            }

            return mapper.Map<IEnumerable<FilterValueDTO>>(values);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in FilterValueService");
            throw new ApplicationException("Error in GetAll function for FilterValue", ex);
        }
    }
}