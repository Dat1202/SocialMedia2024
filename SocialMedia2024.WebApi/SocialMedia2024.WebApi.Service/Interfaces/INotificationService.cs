using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationVM>> GetUserNotifications(string currentUser);
    }
}
