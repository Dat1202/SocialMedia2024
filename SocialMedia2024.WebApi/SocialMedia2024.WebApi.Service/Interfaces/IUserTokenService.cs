
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IUserTokenService
    {
        Task<UserToken> CheckRefreshToken(string code);
        Task SaveToken(UserToken userToken);
    }
}
