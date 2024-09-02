using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class UserTokenService : IUserTokenService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserTokenService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }

        public async Task SaveToken(UserToken userToken)
        {
            await _unitOfWork.UserToken.Add(userToken);
            await _unitOfWork.Commit();
        }

        public async Task<UserToken> CheckRefreshToken(string code)
        {
            return await _unitOfWork.UserToken.GetSingle(x => x.CodeRefreshToken == code);
        }
    }
}
