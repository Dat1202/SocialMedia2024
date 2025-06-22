namespace SocialMedia2024.WebApi.Service.ViewModel
{
    public class UserVM
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Username { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Password { get; set; }
        public bool Sex { get; set; }
    }
}
