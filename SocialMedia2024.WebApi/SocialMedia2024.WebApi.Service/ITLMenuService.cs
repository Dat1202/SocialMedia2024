using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Service
{
    public interface ITLMenuService
    {
        Task<IEnumerable<TLMenu>> GetAll();
        Task<IEnumerable<TLMenu>> GetAllDapperSql();
        Task<IEnumerable<TLMenu>> GetAllDapperStored();

    }
}