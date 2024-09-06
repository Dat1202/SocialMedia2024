using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.Interfaces;

namespace SocialMedia2024.WebApi.Infrastructure.Interfaces
{
    public interface IFriendRepository : IRepository<Friend>
    {
        Task<Friend> ExistFriend(string currentUser, string friendId);
    }
}
