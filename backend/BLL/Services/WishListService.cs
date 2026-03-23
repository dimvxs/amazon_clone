using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using DefaultNamespace;

public class WishlistService : IWishlistService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<WishlistService> logger;

    public WishlistService(IUnitOfWork db, IMapper mapper, ILogger<WishlistService> logger)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Create(WishlistDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in WishlistService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_Wishlist.Add(mapper.Map<Wishlist>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding Wishlist in WishlistService");
            throw new ApplicationException("Error adding Wishlist", ex);
        }
    }

    public async Task Update(WishlistDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in WishlistService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in WishlistService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_Wishlist.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("Wishlist with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"Wishlist with ID {entity.Id} not found");
            }

            await db.R_Wishlist.Update(mapper.Map<Wishlist>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating Wishlist with ID {Id} in WishlistService", entity.Id);
            throw new ApplicationException("Error updating Wishlist", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in WishlistService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_Wishlist.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("Wishlist with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"Wishlist with ID {id} not found");
            }

            await db.R_Wishlist.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting Wishlist with ID {Id} in WishlistService", id);
            throw new ApplicationException("Error deleting Wishlist", ex);
        }
    }

    public async Task<WishlistDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in WishlistService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_Wishlist.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Wishlist with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Wishlist with ID {id} not found");
            }

            return mapper.Map<WishlistDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Wishlist with ID {Id} in WishlistService", id);
            throw new ApplicationException("Error getting Wishlist", ex);
        }
    }

    public async Task<IEnumerable<WishlistDTO>> GetAll()
    {
        try
        {
            var lists = await db.R_Wishlist.GetAll();
            if (lists == null)
            {
                logger.LogWarning("GetAll returned null in WishlistService");
                return Enumerable.Empty<WishlistDTO>();
            }

            return mapper.Map<IEnumerable<WishlistDTO>>(lists);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in WishlistService");
            throw new ApplicationException("Error in GetAll function for Wishlist", ex);
        }
    }
}