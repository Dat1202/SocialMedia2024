using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Infrastructure.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
    }
}
