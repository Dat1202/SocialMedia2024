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
        public User User { get; set; }
        public string UserID { get; set; }
        public Post? Post { get; set; }  
        public int? PostID { get; set; } 
        public bool Seen { get; set; }
        public NotificationType ActionType { get; set; } 
    }
}
