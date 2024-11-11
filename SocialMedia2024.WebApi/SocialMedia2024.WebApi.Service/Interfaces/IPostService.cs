using CloudinaryDotNet.Actions;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IPostService
    {
        Task CreatePost(Post post, List<ImageUploadResult> images);
        Task<IEnumerable<PostVM>> ListPost(string userId, int page);
    }
}
