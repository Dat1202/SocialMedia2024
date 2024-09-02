using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IMenuService
    {
        Task Delete(string name);
        Task<IEnumerable<TLMenu>> GetAll();
        Task<IEnumerable<TLMenu>> GetAllDapperSql();
        Task<IEnumerable<TLMenu>> GetAllDapperStored();

    }
}