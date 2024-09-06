
namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IFriendService
    {
        Task AddFriend(string currentUser, string friendId);
        Task AcceptFriend(string currentUser, string friendId);
        Task DeniedFriend(string currentUser, string friendId);
        Task BlockedFriend(string currentUser, string friendId);
    }
}
