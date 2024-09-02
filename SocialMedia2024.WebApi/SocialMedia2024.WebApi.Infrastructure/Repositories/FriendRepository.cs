using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Infrastructure.Interfaces;


namespace SocialMedia2024.WebApi.Infrastructure.Repositories
{
    public class FriendRepository : Repository<Friend>, IFriendRepository
    {
        public FriendRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
