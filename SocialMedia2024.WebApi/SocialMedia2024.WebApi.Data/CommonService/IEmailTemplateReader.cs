namespace SocialMedia2024.WebApi.Data.CommonService
{
    public interface IEmailTemplateReader
    {
        Task<string> GetTemplate(string templateName);
    }
}