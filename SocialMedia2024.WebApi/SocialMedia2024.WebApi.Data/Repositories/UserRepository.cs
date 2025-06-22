using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Data.Persistence;
using SocialMedia2024.WebApi.Data.Interfaces;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
