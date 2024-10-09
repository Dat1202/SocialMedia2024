using Microsoft.AspNetCore.Http;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PostService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }
        public async Task CreatePost(Post post, List<string>? urls, string userId)
        {
            var listMedia = new List<PostMedia>();
            post.UserID = userId;
            await _unitOfWork.Posts.Add(post);

            if(urls != null)
            {
                foreach (var url in urls)
                {
                    var newPostMedia = new PostMedia
                    {
                        MediaUrl = url,
                        Post = post,
                    };
                    listMedia.Add(newPostMedia);
                }
            }
          
            await _unitOfWork.PostMedia.Add(listMedia);
            await _unitOfWork.Commit();
        }
    }
}
