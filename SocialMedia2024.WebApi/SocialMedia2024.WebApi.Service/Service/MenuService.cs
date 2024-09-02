using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Core;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.Interfaces;
namespace SocialMedia2024.WebApi.Service.Service
{
    public class MenuService : IMenuService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDapperHelper _dapperHelper;
        private readonly IDistributedCacheService _distributedCacheService;

        public MenuService(IUnitOfWork unitOfWork, IDapperHelper dapperHelper, IDistributedCacheService distributedCacheService)
        {
            _unitOfWork = unitOfWork;
            _dapperHelper = dapperHelper;
            _distributedCacheService = distributedCacheService;
        }

        public async Task<IEnumerable<TLMenu>> GetAll()
        {
            var resultCache = await _distributedCacheService.Get<IEnumerable<TLMenu>>("cache_tlmenu_1");

            if (resultCache != null)
            {
                return resultCache;
            }

            var menuItems = await _unitOfWork.Menus.GetAll();

            await _distributedCacheService.Set("cache_tlmenu_1", menuItems);

            return menuItems;
        }

        public async Task Delete(string name)
        {
            _unitOfWork.Menus.Delete(m => m.MenuIcon == name);
            await _unitOfWork.Commit();
        }


        public async Task<IEnumerable<TLMenu>> GetAllDapperSql()
        {
            string sql = "Select * from Menu";

            return await _dapperHelper.ExecuteSqlReturnList<TLMenu>(sql);
        }

        public async Task<IEnumerable<TLMenu>> GetAllDapperStored()
        {
            string sql = "GetMenu";

            return await _dapperHelper.ExecuteStoreProcedureReturnListAsync<TLMenu>(sql);
        }
    }
}
