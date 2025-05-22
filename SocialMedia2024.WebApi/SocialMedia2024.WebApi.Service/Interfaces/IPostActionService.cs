using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IPostActionService
    {
        Task ModifyPostAction(PostActionVM postAction);
        Task<IEnumerable<PostAction>> GetUserPostActions(string userId);
    }
}
