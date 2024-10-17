
using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Const;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.Domain.Entities
{
    public class PostMedia : BaseModel
    {
        [Required]
        [MaxLength(StringLength.MaxLength)]
        public string? MediaUrl { get; set; }
        public long Height { get; set; }
        public long Width { get; set; }
        public bool IsVideo { get; set; }
        public int PostID { get; set; }
        public Post Post { get; set; }
    }
}
