using Microsoft.EntityFrameworkCore;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Domain.Interfaces;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Infrastructure.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Repositories;
using System.Xml.Linq;

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
        //IUserTokenRepository UserToken { get; }
        DbSet<T> Table<T>() where T : class;

        Task Commit();
    }
}
