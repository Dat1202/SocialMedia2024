
using AutoMapper;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.ViewModel;

namespace SocialMedia2024.WebApi.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() 
        {
            CreateMap<ErrorVM, SystemError>().ReverseMap();
            CreateMap<UserVM, User>().ForMember(u => u.PasswordHash, y => y.MapFrom(src => src.Password)).ReverseMap();
        }   
    }
}
