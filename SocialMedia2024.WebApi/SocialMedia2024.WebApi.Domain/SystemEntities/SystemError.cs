using SocialMedia2024.WebApi.Domain.BaseEntities;

namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class SystemError : BaseModel
    {
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}
