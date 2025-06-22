
using System.Text.Json.Serialization;

namespace SocialMedia2024.WebApi.Data.ViewModel
{
    public class PostVM
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public string Username { get; set; }
        public string Avatar { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public int TotalCount { get; set; }
        public List<PostMediaVM> PostMedias { get; set; }
        [JsonIgnore]
        public string PostMediasJson { get; set; }
    }
}
