
using Microsoft.Extensions.Options;
using SocialMedia2024.WebApi.Core.Configuration;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using System.Net;
using System.Net.Mail;

namespace SocialMedia2024.WebApi.Core.EmailHelper
{
    public class EmailHelper : IEmailHelper
    {
        private readonly EmailConfig _emailConfig;

        public EmailHelper(IOptions<EmailConfig> emailConfig)
        {
            _emailConfig = emailConfig.Value;
        }

        public async Task SendMail(EmailRequest emailRequest)
        {
            SmtpClient smtpClient = new SmtpClient(_emailConfig.Provider, _emailConfig.Port);
            smtpClient.Credentials = new NetworkCredential(_emailConfig.DefaultSender, _emailConfig.Password);
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(_emailConfig.DefaultSender);
            mailMessage.To.Add(emailRequest.To);
            mailMessage.IsBodyHtml = true;  
            mailMessage.Subject = emailRequest.Subject;
            mailMessage.Body = emailRequest.Content;

            if (emailRequest?.AttachmentFilePaths?.Length > 0)
            {
                foreach (var path in emailRequest.AttachmentFilePaths)
                {
                    Attachment attachment = new Attachment(path);

                    mailMessage.Attachments.Add(attachment);
                }
            }

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
