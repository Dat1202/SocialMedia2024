namespace SocialMedia2024.WebApi.Middleware
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}

