using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : HandleController
    {
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IPostService _postService;
        private readonly IMapper _mapper;
        private readonly IPostActionService _postActionService;

        public PostController(IErrorCodeService errorService, IMapper mapper, ICloudinaryService cloudinaryService
            , IPostService postService, IPostActionService postActionService) : base(errorService)
        {
            _cloudinaryService = cloudinaryService;
            _postService = postService;
            _mapper = mapper;
            _postActionService = postActionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPost([FromQuery] int page)
        {
            var currentUserId = User.FindFirst("UserId")?.Value;
            var pageSize = 5;
            var posts = await _postService.ListPost(currentUserId, page, pageSize);

            return await ResponseSuccess(posts, "PostSuccess");
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] PostCreateVM postVM)
        {
            var currentUserId = User.FindFirst("UserId")?.Value;
            var post = _mapper.Map<Post>(postVM);
            post.UserID = currentUserId;
            var resultList = await _cloudinaryService.UploadImages(postVM.Files);

            await _postService.CreatePost(post, resultList);

            return await CreateOK("PostSuccess");
        }

        [HttpPost("actions")]
        public async Task<IActionResult> CreatePostAction([FromBody] PostActionVM postActionVM)
        {
            var currentUserId = User.FindFirst("UserId")?.Value;
            postActionVM.CurrentUserID = currentUserId;

            await _postActionService.ModifyPostAction(postActionVM);

            return await CreateOK();
        }

        [HttpGet("actions")]
        public async Task<IActionResult> GetPostActions()
        {
            var currentUserId = User.FindFirst("UserId")?.Value;

            return await ResponseSuccess(await _postActionService.GetUserPostActions(currentUserId), "");
        }
    }
}
