using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
