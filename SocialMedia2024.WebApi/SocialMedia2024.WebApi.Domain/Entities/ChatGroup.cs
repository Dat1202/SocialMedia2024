using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Entities;

namespace SocialMedia2024.Domain.Entities
{
    public class ChatGroup : BaseModel
    {
        public string? GroupName { get; set; }
        public string? Description { get; set; }
        public ICollection<UserInChatGroup> UserInChatGroups { get; set; } = new List<UserInChatGroup>();   
    }
}
