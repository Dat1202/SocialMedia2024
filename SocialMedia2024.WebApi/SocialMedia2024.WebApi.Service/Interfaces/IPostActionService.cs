using SocialMedia2024.Domain.Entities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IPostActionService
    {
        Task ActionModify(PostAction postAction);
        Task<IEnumerable<PostAction>> ActionGet(string userId);
    }
}
