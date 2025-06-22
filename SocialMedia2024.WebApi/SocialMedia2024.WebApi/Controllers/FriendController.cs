using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Service.ViewModel;
using SocialMedia2024.WebApi.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class FriendController : HandleController
    {
        private readonly IFriendService _friendService;

        public FriendController(IErrorCodeService errorService, IMapper mapper, IFriendService friendService) : base(errorService)
        {
            _friendService = friendService;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetFriendStatus([FromQuery] string friendId)
        {
            try
            {
                var currentUserId = User.FindFirst("UserId")?.Value;
                if (string.IsNullOrWhiteSpace(currentUserId))
                {
                    return await ResponseError("Unauthorized");
                }

                var status = await _friendService.GetFriendStatus(currentUserId, friendId);
                return await ResponseSuccess(status, "Friend status retrieved successfully.");
            }
            catch (Exception ex)
            {
                return await ResponseError("");
            }
        }

        [HttpPost("status")]
        public async Task<IActionResult> UpdateFriendStatus([FromBody] FriendStatusVM friendStatusVM)
        {
            var currentUserId = User.FindFirst("UserId")?.Value;

            if (string.IsNullOrWhiteSpace(currentUserId))
            {
                return await ResponseError("Unauthorized");
            }

            friendStatusVM.UserSentID = currentUserId;

            await _friendService.UpdateFriendStatus(friendStatusVM);
            return await CreateOK();
        }
        [HttpGet("chat-list-user")]
        public async Task<IActionResult> ChatListUser()
        {
            var currentUserId = User.FindFirst("UserId")?.Value;

            return await ResponseSuccess(await _friendService.ChatListUser(currentUserId), "");
        }

    }
}
