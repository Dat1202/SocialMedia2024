using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Service
{
    public interface ITLMenuService
    {
        Task<TLMenu> GetAll();
    }
}