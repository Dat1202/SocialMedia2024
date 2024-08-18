using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Data.Repositories;

namespace SocialMedia2024.WebApi.Service
{
    public class TLMenuService : ITLMenuService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TLMenuService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<TLMenu> GetAll()
        {
            return await _unitOfWork.TLMenus.GetById(1);
        }
    }
}
