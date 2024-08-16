using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Data.Repositories
{

    public class Repository<T> : IRepositoty<T> where T : class
    {
        private readonly SocialMedia2024DbContext _socialMedia2024DbContext;

        public Repository(SocialMedia2024DbContext socialMedia2024DbContext) 
        {
            _socialMedia2024DbContext = socialMedia2024DbContext;
        }
        
    }
}
