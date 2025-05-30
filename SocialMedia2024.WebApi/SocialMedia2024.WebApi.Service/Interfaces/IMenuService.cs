﻿using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IMenuService
    {
        Task Delete(string name);
        Task<IEnumerable<TLMenu>> GetAll();
        Task<IEnumerable<TLMenu>> GetAllDapperSql();
    }
}