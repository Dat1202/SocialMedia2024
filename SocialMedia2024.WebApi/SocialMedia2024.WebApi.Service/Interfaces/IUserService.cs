
using SocialMedia2024.Domain.Entities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IUserService
    {
        Task<User> CheckLogin(string username, string password);
        Task<User> FindById(string id);
        Task<User> FindByUsername(string name);
    }
}
