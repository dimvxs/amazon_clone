using AutoMapper;
using backend.BLL.DTO;
using DefaultNamespace;

namespace backend.BLL.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        { 
            CreateMap<AddressDTO, Address>().ReverseMap();
            CreateMap<CartItemDTO, CartItem>().ReverseMap();
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<CreditCardDTO, CreditCard>().ReverseMap();
            CreateMap<FilterDTO, Filter>().ReverseMap();
            CreateMap<FilterValueDTO, FilterValue>().ReverseMap();
            CreateMap<OrderDTO, Order>().ReverseMap();
            CreateMap<ProductImageCreateDTO, ProductImageDTO>()
            .ForMember(dest => dest.ImageUrl, opt => opt.Ignore());
            CreateMap<OrderItemDTO, OrderItem>().ReverseMap();
            CreateMap<ProductDTO, Product>().ReverseMap();
            CreateMap<ProductImageDTO, ProductImage>().ReverseMap();
            CreateMap<ReviewDTO, Review>().ReverseMap();
            CreateMap<RoleDTO, Role>().ReverseMap();
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<WishlistDTO, Wishlist>().ReverseMap();
            CreateMap<ReviewImagesDTO, ReviewImagesDTO>();
        }
    }
}
