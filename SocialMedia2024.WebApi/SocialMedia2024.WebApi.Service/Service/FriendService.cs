using Dapper;
using Microsoft.AspNetCore.Identity;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Domain.Enum;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.ViewModel;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class FriendService : IFriendService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDapperHelper _dapperHelper;
        private readonly UserManager<User> _userManager;

        public FriendService(IUnitOfWork unitOfWork, UserManager<User> userManager, IDapperHelper dapperHelper) 
        {
            _dapperHelper = dapperHelper;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        public async Task FriendStatusModify(FriendStatusVM friendStatusVM)
        {
            var sql = "Friend_Status_Modify";
            var parameters = new DynamicParameters();
            parameters.Add("@CurrentUserId", friendStatusVM.UserFollowerID);
            parameters.Add("@ProfileUserId", friendStatusVM.UserFollowingID);
            parameters.Add("@Status", friendStatusVM.Status);

            await _dapperHelper.ExecuteNonReturn(sql, parameters);

        }

        public async Task<FriendStatusVM> FriendStatusGet(string currentUserId, string friendId)
        {
            var sql = "Friend_Status_Get";
            var parameters = new DynamicParameters();
            parameters.Add("@CurrentUserId", currentUserId);
            parameters.Add("@ProfileUserId", friendId);

            var status = await _dapperHelper.ExecuteReturnSingleRow<FriendStatusVM>(sql, parameters);

            return status;
        }
    }
}
