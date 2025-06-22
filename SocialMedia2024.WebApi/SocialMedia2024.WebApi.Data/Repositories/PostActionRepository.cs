using SocialMedia2024.Data.Persistence;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class PostActionRepository : Repository<PostAction>, IPostActionRepository
    {
        public PostActionRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
