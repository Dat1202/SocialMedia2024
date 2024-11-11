using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Enum;

namespace SocialMedia2024.Domain.Entities
{
    public class Friend
    {
        public User? UserSent { get; set; }
        public string UserSentID { get; set; }
        public User? UserReceived { get; set; }
        public string UserReceivedID { get; set; }
        public Status Status { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime? UpdateAt { get; set; }
    }
}
