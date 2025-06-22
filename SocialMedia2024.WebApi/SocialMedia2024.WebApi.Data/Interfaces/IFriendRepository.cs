using SocialMedia2024.Domain.Entities;

namespace SocialMedia2024.WebApi.Data.Interfaces
{
    public interface IFriendRepository : IRepository<Friend>
    {
        Task<Friend> ExistFriend(string currentUser, string friendId);
    }
}
