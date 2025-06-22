using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SocialMedia2024.WebApi.Core.EmailHelper;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.Service;
using SocialMedia2024.WebApi.ViewModel;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class NotificationController : HandleController
    {
        private readonly INotificationService _notificationService;

        public NotificationController(IErrorCodeService errorService, IMapper mapper, INotificationService notificationService) : base(errorService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotification()
        {
            var currentUserId = User.FindFirst("UserId")?.Value;
            var notifications =  await _notificationService.GetUserNotifications(currentUserId);

            return await ResponseSuccess(notifications, "test");
        }

    }
}
