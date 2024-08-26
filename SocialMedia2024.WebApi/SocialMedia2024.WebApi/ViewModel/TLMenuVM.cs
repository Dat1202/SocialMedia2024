using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.WebApi.ViewModel
{
    public class TLMenuVM
    {
        [Required]
        public string MenuName { get; set; }
        public string MenuLink { get; set; }
        public string MenuIcon { get; set; }
    }
}
