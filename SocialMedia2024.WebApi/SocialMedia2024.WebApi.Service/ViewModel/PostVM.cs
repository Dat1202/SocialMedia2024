using System.Text.Json.Serialization;

namespace SocialMedia2024.WebApi.Service.ViewModel
{
    public class PostVM
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public string PostUserId { get; set; }//userId của post
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public int TotalCount { get; set; }
        public int ReactionTypeID { get; set; }
        public DateTime PostActionCreatedAt { get; set; }
        public List<PostMediaVM> PostMedias { get; set; }
        [JsonIgnore]
        public string PostMediasJson { get; set; }
    }
}
