using SocialMedia2024.Domain.Enum;

namespace SocialMedia2024.WebApi.Service.ViewModel
{
    public class PostActionVM
    {
        public ReactionType ReactionTypeID { get; set; }
        public int PostID { get; set; }
        public string PostUserID { get; set; }
        public string? CurrentUserID { get; set; }
    }
}
