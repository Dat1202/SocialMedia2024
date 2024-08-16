
using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Const;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.Domain.Entities
{
    public class ReplyComment : BaseModel
    {
        [Required]
        [MaxLength(Const.MaxLength)]
        public string Content {  get; set; }
        public int CommentParentID {  get; set; }
        public Comment Comment { get; set; }
        public User User { get; set; }
        public string UserID { get; set; }
    }
}
