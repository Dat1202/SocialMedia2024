using Microsoft.EntityFrameworkCore;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Domain.Interfaces;
using System.Linq.Expressions;

namespace SocialMedia2024.WebApi.Data.Repositories
{

public class Repository<T> : IRepository<T> where T : class
    {
        private readonly SocialMedia2024DbContext _socialMedia2024DbContext;

        public Repository(SocialMedia2024DbContext socialMedia2024DbContext) 
        {
            _socialMedia2024DbContext = socialMedia2024DbContext;
        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? expression)
        {
            if (expression == null) 
            {
                return await _socialMedia2024DbContext.Set<T>().ToListAsync();
            }   
            return await _socialMedia2024DbContext.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<T> GetById(object id)
        {
            var entity = await _socialMedia2024DbContext.Set<T>().FindAsync(id);
            return entity ?? throw new KeyNotFoundException($"Entity with '{id}' was not found.");
        }

        public async Task Add(T entity) => await _socialMedia2024DbContext.Set<T>().AddAsync(entity);

        public async Task Add(IEnumerable<T> entities) => await _socialMedia2024DbContext.Set<T>().AddRangeAsync(entities);

        public void Delete(Expression<Func<T, bool>> expression)
        {
            var entities = _socialMedia2024DbContext.Set<T>().Where(expression).ToList();
            if (entities.Count > 0)
            {
                _socialMedia2024DbContext.Set<T>().RemoveRange(entities);
            }
        }

        public void Delete(T entity)
        {
            _socialMedia2024DbContext.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            _socialMedia2024DbContext.Set<T>().Update(entity);
        }

        public IQueryable<T> Table => _socialMedia2024DbContext.Set<T>();
    }
}
