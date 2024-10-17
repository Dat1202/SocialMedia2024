
namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string[]? AttachmentFilePaths { get; set; }
    }
}
