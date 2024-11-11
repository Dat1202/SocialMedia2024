using SocialMedia2024.WebApi.Domain.BaseEntities;

namespace SocialMedia2024.Domain.Entities
{
    public enum NotificationType
    {
        Action,
        FriendRequest
    }

    public class Notification : BaseModel
    {
        public User UserSent { get; set; } 
        public string UserSentID { get; set; }     /*Người thực hiện hành động*/
        public User UserReceived { get; set; }
        public string UserReceivedID { get; set; } /*Người nhận thông báo*/
        public Post? Post { get; set; }  
        public int? PostID { get; set; } 
        public bool Seen { get; set; }
        public NotificationType ActionType { get; set; } 
    }
}
