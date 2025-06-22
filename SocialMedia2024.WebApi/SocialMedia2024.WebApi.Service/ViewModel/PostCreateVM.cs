using Microsoft.AspNetCore.Http;

namespace SocialMedia2024.WebApi.Service.ViewModel
{
    public class PostCreateVM
    {
        public string? Content { get; set; }
        public List<IFormFile>? Files { get; set; }
    }

}
