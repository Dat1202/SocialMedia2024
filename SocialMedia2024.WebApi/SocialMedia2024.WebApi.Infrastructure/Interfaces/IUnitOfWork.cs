using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Domain.Interfaces;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Data.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<TLMenu> TLMenus { get; }
        IRepository<Post> Posts { get; }

        Task Commit();
    }
}
