using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Const;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.Domain.Entities
{
    public class Comment : BaseModel
    {
        [Required]
        [MaxLength(Const.MaxLength)]
        public string? Content{ get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int PostID { get; set; }
        public Post Post { get; set; }
        public ICollection<ReplyComment> ReplyComments { get; set; } = new List<ReplyComment>();    
    }
}
