using Microsoft.EntityFrameworkCore;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Infrastructure.Interfaces;

namespace SocialMedia2024.WebApi.Infrastructure.Repositories
{
    public class FriendRepository : Repository<Friend>, IFriendRepository
    {
       private readonly SocialMedia2024DbContext _socialMedia2024DbContext;
       public FriendRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
            _socialMedia2024DbContext = socialMedia2024DbContext;
        }

        public async Task<bool> FriendExists(string currentUser, string friendId)
        {
            return await _socialMedia2024DbContext.Friend.AsNoTracking().AnyAsync(f => f.UserSentID == currentUser && f.UserReceivedID == friendId);
        }
    }
}   
