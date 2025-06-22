
namespace SocialMedia2024.WebApi.Data.ViewModel
{
    public class PostMediaVM
    {
        public int Id { get; set; }
        public string? MediaUrl { get; set; }
        public long Height { get; set; }
        public long Width { get; set; }
        public bool IsVideo { get; set; }
    }
}
