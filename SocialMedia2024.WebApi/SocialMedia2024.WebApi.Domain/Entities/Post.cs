using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Const;
using SocialMedia2024.WebApi.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.Domain.Entities
{
    public class Post : BaseModel
    {
        [Required]
        [MaxLength(Const.MaxLength)]
        public string? Content { get; set; }
        public MediaType? MediaType { get; set; }
        public string UserID { get; set; }
        public User User { get; set; }
        public ICollection<PostAction> PostActions { get; set; } = new List<PostAction>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<PostMedia> PostMedias { get; set; } = new List<PostMedia>();
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    }
}