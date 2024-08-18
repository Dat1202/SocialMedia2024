
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
        public int PostID { get; set; }
        public required Post Post { get; set; }
    }
}
