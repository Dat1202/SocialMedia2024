using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Service.ViewModel;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class FriendController : HandleController
    {
        private readonly IFriendService _friendService;

        public FriendController(IErrorCodeService errorService, IMapper mapper, IFriendService friendService) : base(errorService, mapper)
        {
            _friendService = friendService;
        }

        [HttpPost("status-friend")]
        public async Task<IActionResult> FriendStatusPost([FromBody] FriendStatusVM friendStatusVM)
        {
            friendStatusVM.UserFollowerID = User.FindFirst("UserId")?.Value;

            await _friendService.FriendStatusModify(friendStatusVM);
            return await CreateOK();
        }

        [HttpGet("status-friend")]
        public async Task<IActionResult> FriendStatusGet([FromQuery] string friendId)
        {
            var currentUser = User.FindFirst("UserId")?.Value;

            var status =  await _friendService.FriendStatusGet(currentUser, friendId);
            return await ResponseSuccess(status,"");
        }

    }
}
