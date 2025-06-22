
using SocialMedia2024.Data.Persistence;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class MenuRepository : Repository<TLMenu>, IMenuRepository
    {
        public MenuRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
