using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.Service;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ChatController : HandleController
    {
        private readonly IChatService _chatService;

        public ChatController(IErrorCodeService errorService, IChatService chatService) : base(errorService)
        {
            _chatService = chatService;
        }

        [HttpGet("recent-conversations")]
        public async Task<IActionResult> GetRecentChatUsers()
        {
            var currentUserId = User.FindFirst("UserId")?.Value;

            if (string.IsNullOrWhiteSpace(currentUserId))
            {
                return await ResponseError("Unauthorized");
            }

            var data = await _chatService.GetRecentChatUsers(currentUserId);
            return await ResponseSuccess(data, "");
        }

    }
}
