namespace SocialMedia2024.WebApi.Middleware
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message)
        {
        }
    }
}
