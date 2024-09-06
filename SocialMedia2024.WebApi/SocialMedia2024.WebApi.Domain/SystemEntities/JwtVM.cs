namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class JwtVM
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string AccessTokenExpiredDate {  get; set; }
    }
}
