namespace SocialMedia2024.WebApi.Service.ViewModel
{
    public class NotificationVM
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string SenderName { get; set; }
        public string Avatar { get; set; }
        public string? Reaction { get; set; }
        public int PostID { get; set; }
        public int ActionType { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Seen { get; set; }
    }
}
