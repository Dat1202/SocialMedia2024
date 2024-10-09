
using Microsoft.AspNetCore.Http;
using SocialMedia2024.Domain.Entities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IPostService
    {
        Task CreatePost(Post post, List<string>? files, string userId);
    }
}
