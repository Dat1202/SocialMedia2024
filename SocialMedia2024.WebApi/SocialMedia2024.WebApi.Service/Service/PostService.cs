using CloudinaryDotNet.Actions;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Domain.ViewModel;
using Dapper;
using Newtonsoft.Json;
using SocialMedia2024.WebApi.Infrastructure.Dapper;

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
            var listMedia = new List<PostMedia>();
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
                    listMedia.Add(newPostMedia);
                }
            }
          
            await _unitOfWork.PostMedia.Add(listMedia);
            await _unitOfWork.Commit();
        }

        public async Task<IEnumerable<PostVM>> ListPost(string userId)
        {
            string sql = "GetPost";

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);

            var postDtos = await _dapperHelper.ExecuteStoreProcedureReturnListAsync<PostVM>(sql, parameters);

            foreach (var post in postDtos)
            {
                if (!string.IsNullOrEmpty(post.PostMediasJson))
                {
                    post.PostMedias = JsonConvert.DeserializeObject<List<PostMediaVM>>(post?.PostMediasJson);
                }
            }

            return postDtos;
        }
    }
}
