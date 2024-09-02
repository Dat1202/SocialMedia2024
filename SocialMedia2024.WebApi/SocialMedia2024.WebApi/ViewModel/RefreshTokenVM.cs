using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.WebApi.ViewModel
{
    public class RefreshTokenVM
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}
