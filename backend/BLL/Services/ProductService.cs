using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class ProductService : IProductService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<ProductService> logger;

    public ProductService(IUnitOfWork db, IMapper mapper, ILogger<ProductService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(ProductDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in ProductService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Product.Add(mapper.Map<Product>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Product in ProductService");
            throw new ApplicationException("Error adding Product", ex);
        }
    }

    public async Task Update(ProductDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in ProductService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in ProductService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Product.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Product with ID {entity.Id} not found");
            }

            await db.R_Product.Update(mapper.Map<Product>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Product with ID {Id} in ProductService", entity.Id);
            throw new ApplicationException("Error updating Product", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Product.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            await db.R_Product.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error deleting Product", ex);
        }
    }

    public async Task<ProductDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Product.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            return mapper.Map<ProductDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error getting Product", ex);
        }
    }

    public async Task<IEnumerable<ProductDTO>> GetAll()
    {
        try
        {
            var products = await db.R_Product.GetAll();
            if (products == null)
            {
                logger.LogWarning("GetAll returned null in ProductService");
                return Enumerable.Empty<ProductDTO>();
            }

            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in ProductService");
            throw new ApplicationException("Error in GetAll function for Product", ex);
        }
    }
}