using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Domain.Interfaces;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Infrastructure.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Repositories;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly SocialMedia2024DbContext _socialMedia2024DbContext;
        private IPostRepository? _Post;
        private IMenuRepository? _Menus;

        private bool disposedValue;

        public UnitOfWork(SocialMedia2024DbContext socialMedia2024DbContext) => _socialMedia2024DbContext = socialMedia2024DbContext;

        public IMenuRepository Menus => _Menus ??= new MenuRepository(_socialMedia2024DbContext);
        public IPostRepository Posts => _Post ??= new PostRepositoty(_socialMedia2024DbContext);

        public async Task Commit()
        {
            await _socialMedia2024DbContext.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _socialMedia2024DbContext.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
