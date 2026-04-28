using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.DAL;
using DefaultNamespace;
using backend.DAL.Repositories;
using backend.Mappers;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly IUnitOfWork db;
    private readonly IMapper mapper;
    private readonly ILogger<UserService> logger;
    private readonly IUserRepository _userRepository;

    public UserService(IUnitOfWork db, IMapper mapper, ILogger<UserService> logger, IUserRepository userRepository)
    {
        this.db = db;
        this.mapper = mapper;
        this.logger = logger;
        _userRepository = userRepository;
    }

    public async Task Create(UserDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Create function in UserService");
            throw new ArgumentNullException(nameof(entity));
        }

        try
        {
            await db.R_User.Add(mapper.Map<User>(entity));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding User in UserService");
            throw new ApplicationException("Error adding User", ex);
        }
    }

    public async Task Update(UserDTO entity)
    {
        if (entity == null)
        {
            logger.LogWarning("Null entity given to Update function in UserService");
            throw new ArgumentNullException(nameof(entity));
        }

        if (entity.Id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Update function in UserService", entity.Id);
            throw new ArgumentException("ID must be greater than 0", nameof(entity.Id));
        }

        try
        {
            var exists = await db.R_User.GetById(entity.Id);
            if (exists == null)
            {
                logger.LogWarning("User with ID {Id} not found in Update function", entity.Id);
                throw new KeyNotFoundException($"User with ID {entity.Id} not found");
            }
            var (hash, salt) = PasswordHelper.HashPassword(entity.HashPassword);
            entity.HashPassword = Convert.ToBase64String(hash);
            mapper.Map(entity, exists);
            exists.Salt = Convert.ToBase64String(salt);
            
            await db.R_User.Update(exists);
            await db.SaveAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating User with ID {Id} in UserService", entity.Id);
            throw new ApplicationException("Error updating User", ex);
        }
    }

    public async Task Delete(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Delete function in UserService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var exists = await db.R_User.GetById(id);
            if (exists == null)
            {
                logger.LogWarning("User with ID {Id} not found in Delete function", id);
                throw new KeyNotFoundException($"User with ID {id} not found");
            }

            await db.R_User.Delete(id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting User with ID {Id} in UserService", id);
            throw new ApplicationException("Error deleting User", ex);
        }
    }

    public async Task<UserInfoDTO> GetUserInfo(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in ProductService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await _userRepository.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("Product with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"Product with ID {id} not found");
            }

            return entity.ToInfoDto();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting Product with ID {Id} in ProductService", id);
            throw new ApplicationException("Error getting Product", ex);
        }
    }

    public async Task<UserDTO> Get(int id)
    {
        if (id <= 0)
        {
            logger.LogWarning("Invalid ID {Id} in Get function in UserService", id);
            throw new ArgumentException("ID must be greater than 0", nameof(id));
        }

        try
        {
            var entity = await db.R_User.GetById(id);
            if (entity == null)
            {
                logger.LogWarning("User with ID {Id} not found in Get function", id);
                throw new KeyNotFoundException($"User with ID {id} not found");
            }

            return mapper.Map<UserDTO>(entity);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting User with ID {Id} in UserService", id);
            throw new ApplicationException("Error getting User", ex);
        }
    }

    public async Task<IEnumerable<UserDTO>> GetAll()
    {
        try
        {
            var users = await db.R_User.GetAll();
            if (users == null)
            {
                logger.LogWarning("GetAll returned null in UserService");
                return Enumerable.Empty<UserDTO>();
            }

            return mapper.Map<IEnumerable<UserDTO>>(users);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetAll function in UserService");
            throw new ApplicationException("Error in GetAll function for User", ex);
        }
    }

    public async Task<UserEntityDTO?> GetByEmail(string email)
    {
        var user = await _userRepository.GetByEmail(email);
        if (user == null) return null;

        return mapper.Map<UserEntityDTO>(user);
    }


    public Task<bool> EmailExists(string email)
    {
        return _userRepository.EmailExists(email);
    }


public async Task Register(RegisterDTO dto)
{
    // 1. Хешируем пароль
    var (hash, salt) = PasswordHelper.HashPassword(dto.Password);

 

    // 3. Создаём пользователя
    var user = new User(
        name: dto.FullName,               // имя и фамилия вместе
        email: dto.Email,
        hashPassword: Convert.ToBase64String(hash),
        country: "",                       // пустая строка по умолчанию
        phone: "",                         // пустая строка по умолчанию
        role: null,
        roleId: 1

    );

    // 4. Сохраняем Salt
    user.Salt = Convert.ToBase64String(salt);

    // 5. Сохраняем в БД
    _userRepository.Add(user);        
    await _userRepository.SaveAsync();
}


}