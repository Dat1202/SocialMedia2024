using Microsoft.AspNetCore.Identity;
using SocialMedia2024.WebApi.Domain.Const;
using SocialMedia2024.WebApi.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace SocialMedia2024.Domain.Entities
{
    public class User : IdentityUser
    {
        [MaxLength(StringLength.MinLength)]
        public string? Avatar { get; set; }
        [MaxLength(StringLength.MinLength)]
        public string? Cover { get; set; } /*ảnh bìa*/
        [Required]
        [MaxLength(StringLength.MinLength)]
        public string? LastName { get; set; }
        [Required]
        [MaxLength(StringLength.MinLength)]
        public string? FirstName { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime? UpdateAt { get; set; } 
        public DateOnly DateOfBirth {  get; set; }
        public bool Sex { get; set; }
        public ICollection<PostAction> PostActions { get; set; } = new List<PostAction>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<ReplyComment> ReplyComments { get; set; } = new List<ReplyComment>();
        public ICollection<Post> Posts { get; set; } = new List<Post>(); 
        public ICollection<Friend> UserFollowings { get; set; } = new List<Friend>();
        public ICollection<Friend> UserFollowers { get; set; } = new List<Friend>();
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
        public ICollection<UserInChatGroup> UserInChatGroups { get; set; } = new List<UserInChatGroup>();


    }
}
