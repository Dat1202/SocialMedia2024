using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Domain.Interfaces;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly SocialMedia2024DbContext _socialMedia2024DbContext;
        private IRepository<Post>? _Post;

        private IRepository<TLMenu>? _tlMenus;
        private bool disposedValue;

        public UnitOfWork(SocialMedia2024DbContext socialMedia2024DbContext) => _socialMedia2024DbContext = socialMedia2024DbContext;

        public IRepository<TLMenu> TLMenus => _tlMenus ??= new Repository<TLMenu>(_socialMedia2024DbContext);
        public IRepository<Post> Posts => _Post ??= new Repository<Post>(_socialMedia2024DbContext);

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
