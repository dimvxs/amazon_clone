using AutoMapper;
using backend.BLL.DTO;
using backend.Models;
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

            CreateMap<OrderDTO, Order>();
            CreateMap<Order, OrderDTO>();

            CreateMap<OrderItemDTO, OrderItem>();
            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(
                    dest => dest.ProductName,
                    opt => opt.MapFrom(src => src.Product.Name)
                )
                .ForMember(
                    dest => dest.ProductPrice,
                    opt => opt.MapFrom(src => src.Product.Price)
                )
                .ForMember(
                    dest => dest.ProductImageUrl,
                    opt => opt.MapFrom(src => src.Product.Images
                        .OrderByDescending(img => img.IsMain)
                        .ThenBy(img => img.SortOrder)
                        .Select(img => img.ImageUrl)
                        .FirstOrDefault()
                    )
                );

            CreateMap<ProductImageCreateDTO, ProductImageDTO>()
                .ForMember(dest => dest.ImageUrl, opt => opt.Ignore());

            CreateMap<ProductDTO, Product>().ReverseMap();
            CreateMap<ProductImageDTO, ProductImage>().ReverseMap();
            CreateMap<ReviewDTO, Review>().ReverseMap();
            CreateMap<RoleDTO, Role>().ReverseMap();
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<WishlistDTO, Wishlist>().ReverseMap();
            CreateMap<ReviewImagesDTO, ReviewImagesDTO>().ReverseMap();
            CreateMap<ProductMetadata, ProductMetadataDTO>().ReverseMap();
            CreateMap<WishlistItemDTO, WishlistItem>().ReverseMap();

        }
    }
}
