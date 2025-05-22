using CloudinaryDotNet.Actions;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.ViewModel;
using Dapper;
using Newtonsoft.Json;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using Azure;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDapperHelper _dapperHelper;

        public PostService(IUnitOfWork unitOfWork, IDapperHelper dapperHelper)
        {
            _dapperHelper = dapperHelper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreatePost(Post post, List<ImageUploadResult> images)
        {
            var medias = new List<PostMedia>();
            await _unitOfWork.Posts.Add(post);

            if(images != null)
            {
                foreach (var image in images)
                {
                    var newPostMedia = new PostMedia
                    {
                        MediaUrl = image.Url.ToString(),
                        Height = image.Height,
                        Width = image.Width,
                        IsVideo = image.ResourceType.Contains("video") ? true : false,
                        Post = post,
                    };
                    medias.Add(newPostMedia);
                }
            }
          
            await _unitOfWork.PostMedia.Add(medias);
            await _unitOfWork.Commit();
        }

        public async Task<IEnumerable<PostVM>> ListPost(string userId, int page, int pageSize = 5)
        {
            const string storedProcedure = "Post_Get";

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);
            parameters.Add("@PageSize", pageSize);
            parameters.Add("@PageIndex", page);

            var posts = await _dapperHelper.ExecuteStoreProcedureReturnListAsync<PostVM>(storedProcedure, parameters);

            foreach (var post in posts)
            {
                if (!string.IsNullOrEmpty(post.PostMediasJson))
                {
                    post.PostMedias = JsonConvert.DeserializeObject<List<PostMediaVM>>(post?.PostMediasJson);
                }
            }

            return posts;
        }
    }
}
