
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Enum;

namespace SocialMedia2024.WebApi.Domain.Entities
{
    //lưu hành động người dùng
    //union tu 3 bang post, comment, action
    public class Activity : BaseModel
    {
        public string ActivityType { get; set; } /*post, comment, action*/
        public string ActivityData { get; set; } // Nội dung
        public int ActivityTypeID { get; set; } /*foreignKey của post, comment, action*/
        public int UserID { get; set; }
    }
}
