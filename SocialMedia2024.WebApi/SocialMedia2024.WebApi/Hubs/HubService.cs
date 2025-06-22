using Microsoft.AspNetCore.SignalR;
using SocialMedia2024.WebApi.Service.ViewModel;

public class HubService : Hub  
{
    public override async Task OnConnectedAsync()
    {
        //await Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);

        await base.OnConnectedAsync();
    }

    public async Task SendNotification(string user, NotificationVM notificationAction)
    {
        await Clients.User(user).SendAsync("ReceiveNotification", notificationAction);
    }

}
