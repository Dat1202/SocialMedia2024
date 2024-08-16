using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Domain.Interfaces
{
    public interface IRepositoty <T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task Add(T entity);
        Task Add(IEnumerable<T> entities);
        Task Update(T entity);
        Task Delete(Expression<Func<T,bool>> expression);
        Task Delete(T entity);

    }
}
