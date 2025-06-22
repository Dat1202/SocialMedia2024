using Microsoft.EntityFrameworkCore;
using SocialMedia2024.WebApi.Data.Repositories;

namespace SocialMedia2024.WebApi.Data.Interfaces
{
    public interface IUnitOfWork
    {
        IMenuRepository Menus { get; }
        IPostRepository Posts { get; }
        IUserRepository Users { get; }
        ICommentRepository Comment { get; }
        IPostActionRepository PostAction { get; }
        IFriendRepository Friend { get; }
        IPostMediaRepository PostMedia { get; }

        //IUserTokenRepository UserToken { get; }
        DbSet<T> Table<T>() where T : class;

        Task Commit();
    }
}
