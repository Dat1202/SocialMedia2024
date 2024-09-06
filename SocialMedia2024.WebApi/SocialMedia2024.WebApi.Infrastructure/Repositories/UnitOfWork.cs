using Microsoft.EntityFrameworkCore;
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
        private IUserRepository? _User;
        private ICommentRepository? _Comment;
        private IPostActionRepository? _PostAction;
        private IFriendRepository? _Friend;
        //private IUserTokenRepository? _UserToken;

        private bool disposedValue;

        public UnitOfWork(SocialMedia2024DbContext socialMedia2024DbContext) => _socialMedia2024DbContext = socialMedia2024DbContext;
        public IMenuRepository Menus => _Menus ??= new MenuRepository(_socialMedia2024DbContext);
        public IPostRepository Posts => _Post ??= new PostRepository(_socialMedia2024DbContext);
        public IUserRepository Users => _User ??= new UserRepository(_socialMedia2024DbContext);
        public ICommentRepository Comment => _Comment ??= new CommentRepository(_socialMedia2024DbContext);
        public IPostActionRepository PostAction => _PostAction ??= new PostActionRepository(_socialMedia2024DbContext);
        public IFriendRepository Friend => _Friend ??= new FriendRepository(_socialMedia2024DbContext);
        //public IUserTokenRepository UserToken => _UserToken ??= new UserTokenRepository(_socialMedia2024DbContext);

        public DbSet<T> Table<T>() where T : class => _socialMedia2024DbContext.Set<T>();

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
