using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Middleware
{
    public class ValidationException : Exception
    {
        public MessageResponse AdditionalData { get; }

        public ValidationException(string message, MessageResponse additionalData) : base(message)
        {
            AdditionalData = additionalData;
        }
        public ValidationException(string message) : base(message)
        {
        }
    }
}
