using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Data.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Data.Interfaces;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
