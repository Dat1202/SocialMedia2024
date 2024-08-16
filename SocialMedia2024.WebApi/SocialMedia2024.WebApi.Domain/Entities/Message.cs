using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Const;
using SocialMedia2024.WebApi.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.Domain.Entities
{
    public class Message : BaseModel
    {
        [Required]
        [MaxLength(Const.MaxLength)]
        public string Content { get; set; }
        public UserInChatGroup UserInChatGroup { get; set; }
        public int UserGroupChatID { get; set; }
    }
}
