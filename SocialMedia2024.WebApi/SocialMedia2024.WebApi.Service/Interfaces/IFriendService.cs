using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IFriendService
    {
        Task UpdateFriendStatus(FriendStatusVM friendStatusVM);
        Task<FriendStatusVM> GetFriendStatus(string currentUserId, string friendId);
        Task<IEnumerable<UserBriefVM>> ChatListUser(string userId);
    }
}
