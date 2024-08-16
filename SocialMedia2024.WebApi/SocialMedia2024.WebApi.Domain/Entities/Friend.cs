using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Enum;

namespace SocialMedia2024.Domain.Entities
{
    public class Friend : BaseModel
    {
        public required User UserFollower { get; set; }
        public string UserFollowerID { get; set; }
        public required User UserFollowing { get; set; }
        public string UserFollowingID { get; set; }
        public Status Status { get; set; }
    }
}
