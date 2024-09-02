

using SocialMedia2024.WebApi.Domain.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class UserToken : BaseModel
    {
        public string UserId { get; set; }
        public string AccessToken { get; set; }
        public DateTime ExpiredDateAccessToken{ get; set; }
        public string RefreshToken {  get; set; }  
        public DateTime ExpiredDateRefreshToken { get; set; }
        [StringLength(50)]
        public string CodeRefreshToken { get; set; }
    }
}
