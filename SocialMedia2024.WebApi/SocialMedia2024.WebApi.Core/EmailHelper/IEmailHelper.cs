using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Core.EmailHelper
{
    public interface IEmailHelper
    {
        Task SendMail(EmailRequest emailRequest);
    }
}