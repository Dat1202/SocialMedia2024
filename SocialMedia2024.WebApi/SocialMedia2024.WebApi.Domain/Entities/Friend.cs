using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Enum;

namespace SocialMedia2024.Domain.Entities
{
    public class Friend
    {
        public User? UserFollower { get; set; }
        public string UserFollowerID { get; set; }
        public User? UserFollowing { get; set; }
        public string UserFollowingID { get; set; }
        public Status Status { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime? UpdateAt { get; set; }
    }
}
