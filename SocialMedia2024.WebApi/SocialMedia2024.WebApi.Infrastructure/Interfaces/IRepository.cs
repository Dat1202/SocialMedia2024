﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>>? expression = null);
        Task<T?> GetSingle(Expression<Func<T, bool>> expression);
        Task<T?> GetByID(object id); 
        Task Add(T entity);
        Task Add(IEnumerable<T> entities);
        void Update(T entity);
        void Delete(Expression<Func<T,bool>> expression);
        void Delete(T entity);
        IQueryable<T> Table { get; }

    }
}
