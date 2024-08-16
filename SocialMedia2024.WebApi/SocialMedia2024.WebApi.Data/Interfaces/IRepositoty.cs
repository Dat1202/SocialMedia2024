using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Domain.Interfaces
{
    public interface  IRepositoty <T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int id);  
        void Add(T entity);
        void Add(IEnumerable<T> entities);
        void Update(T entity);
        void Delete(Expression<Func<T,bool>> expression);
        void Delete(T entity);

    }
}
