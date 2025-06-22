using Microsoft.Extensions.Hosting;

namespace SocialMedia2024.WebApi.Data.CommonService
{
    public class EmailTemplateReader : IEmailTemplateReader
    {
        private readonly IHostEnvironment _hostEnvironment;
        public EmailTemplateReader(IHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        public async Task<string> GetTemplate(string templateName)
        {
            string templateEmail = Path.Combine(_hostEnvironment.ContentRootPath, templateName);
            string content = await File.ReadAllTextAsync(templateEmail);

            return content;
        }
    }
}
