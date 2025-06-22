using Dapper;
using Microsoft.AspNetCore.Identity;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.ViewModel;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class FriendService : IFriendService
    {
        private readonly IDapperHelper _dapperHelper;

        public FriendService(IDapperHelper dapperHelper) 
        {
            _dapperHelper = dapperHelper;
        }

        public async Task UpdateFriendStatus(FriendStatusVM friendStatusVM)
        {
            const string storedProcedure = "Friend_Status_Modify";
            var parameters = new DynamicParameters();
            parameters.Add("@CurrentUserId", friendStatusVM.UserSentID);
            parameters.Add("@ProfileUserId", friendStatusVM.UserReceivedID);
            parameters.Add("@Status", friendStatusVM.Status);

            await _dapperHelper.ExecuteNonReturn(storedProcedure, parameters);

        }

        public async Task<FriendStatusVM> GetFriendStatus(string currentUserId, string friendId)
        {
            const string storedProcedure = "Friend_Status_Get";
            var parameters = new DynamicParameters();
            parameters.Add("@CurrentUserId", currentUserId);
            parameters.Add("@ProfileUserId", friendId);

            var status = await _dapperHelper.ExecuteReturnSingleRow<FriendStatusVM>(storedProcedure, parameters);

            return status;
        }

        public async Task<IEnumerable<UserBriefVM>> ChatListUser(string userId)
        {
            const string storedProcedure = "Chat_List_User_Get";
            var parameters = new DynamicParameters();
            parameters.Add("@CurrentUserId", userId);

            var users = await _dapperHelper.ExecuteSqlReturnList<UserBriefVM>(storedProcedure, parameters);

            return users;
        }
    }
}
