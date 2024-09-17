using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IErrorCodeService
    {
        Task<string?> GetMessageContent(string messageCode);
    }
}
