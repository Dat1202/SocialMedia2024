using SocialMedia2024.Domain.Entities;

namespace SocialMedia2024.WebApi.Domain.Entities
{
    public class UserInChatGroup
    {
        public DateTime JoinedAt { get; set; } = DateTime.Now;
        public User User { get; set; }
        public string UserID { get; set; }
        public ChatGroup ChatGroup { get; set; }
        public int ChatGroupID { get; set; }
    }
}
