
namespace SocialMedia2024.WebApi.Infrastructure.CommonService
{
    public interface IEmailTemplateReader
    {
        Task<string> GetTemplate(string templateName);
    }
}