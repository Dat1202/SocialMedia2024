using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Core;
using Newtonsoft.Json;
using SocialMedia2024.WebApi.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.Domain.Entities;
namespace SocialMedia2024.WebApi.Service
{
    public class TLMenuService : ITLMenuService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDistributedCacheService _distributedCacheService;

        public TLMenuService(IUnitOfWork unitOfWork, IDistributedCacheService distributedCacheService )
        {
            _unitOfWork = unitOfWork;
            _distributedCacheService = distributedCacheService;
        }

        public async Task<IEnumerable<TLMenu>> GetAll()
        {
            var resultCache = await _distributedCacheService.Get<IEnumerable<TLMenu>>("cache_tlmenu_1");

            if (resultCache != null)
            {
                return resultCache;
            }

            var menuItems = await _unitOfWork.TLMenus.GetAll();

            await _distributedCacheService.Set("cache_tlmenu_1", menuItems);

            return menuItems;
        }
    }
}
