using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Infrastructure.Interfaces;

namespace SocialMedia2024.WebApi.Infrastructure.Repositories
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
        private readonly SocialMedia2024DbContext _socialMedia2024DbContext;

        public PostRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
            _socialMedia2024DbContext = socialMedia2024DbContext;
        }

    }
}
