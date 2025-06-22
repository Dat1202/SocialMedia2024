using Microsoft.AspNetCore.SignalR;

namespace SocialMedia2024.WebApi.Hubs
{
    public class NameUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst("UserId")?.Value;
        }
    }
}
