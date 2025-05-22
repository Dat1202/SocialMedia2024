
using SocialMedia2024.Domain.Entities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IUserService
    {
        Task<User> ValidateUser(string username, string password);
        Task<User> GetUserById(string id);
        Task<User> GetUserByUsername(string name);
        Task UpdateUserAvatar(string fileName, string userId);
        Task<User> GetUserProfile(string userId);
    }
}
