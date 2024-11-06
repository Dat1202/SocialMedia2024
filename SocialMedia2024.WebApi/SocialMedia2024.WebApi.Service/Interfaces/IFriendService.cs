using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IFriendService
    {
        Task FriendStatusModify(FriendStatusVM friendStatusVM);
        Task<FriendStatusVM> FriendStatusGet(string currentUserId, string friendId);
    }
}
