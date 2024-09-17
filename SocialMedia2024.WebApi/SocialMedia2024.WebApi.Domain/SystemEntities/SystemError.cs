using SocialMedia2024.WebApi.Domain.BaseEntities;

namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class MessageResponse : BaseModel
    {
        public string MessageCode { get; set; }
        public string MessageContent { get; set; }
    }
}
 