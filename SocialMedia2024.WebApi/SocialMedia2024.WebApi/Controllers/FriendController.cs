using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class FriendController : Controller
    {
        private readonly IFriendService _friendService;

        public FriendController(IFriendService friendService) 
        {
            _friendService = friendService;
        }

        [HttpPost("add-friend")]
        public async Task<IActionResult> AddFriend([FromBody] string friendId)
        {
            var currentUser = User.FindFirst("UserId")?.Value;

            await _friendService.AddFriend(currentUser, friendId);
            return Created();
        }

        [HttpPatch("accept-friend")]
        public async Task<IActionResult> AcceptFriend([FromBody] string friendId)
        {
            var currentUser = User.FindFirst("UserId")?.Value;

            await _friendService.AcceptFriend(currentUser, friendId);
            return Ok();
        }

        [HttpPatch("blocked-friend")]
        public async Task<IActionResult> BlockedFriend([FromBody] string friendId)
        {
            var currentUser = User.FindFirst("UserId")?.Value;

            await _friendService.BlockedFriend(currentUser, friendId);
            return Ok();
        }

        [HttpPatch("denied-friend")]
        public async Task<IActionResult> DeniedFriend([FromBody] string friendId)
        {
            var currentUser = User.FindFirst("UserId")?.Value;

            await _friendService.DeniedFriend(currentUser, friendId);
            return Ok();
        }
    }
}
