using Dapper;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class ChatService : IChatService
    {
        private readonly IDapperHelper _dapperHelper;

        public ChatService(IDapperHelper dapperHelper)
        {
            _dapperHelper = dapperHelper;
        }

        public async Task<IEnumerable<UserBriefVM>> GetRecentChatUsers(string userId)
        {
            const string storedProcedure = "User_In_Group_Get";

            var parameters = new DynamicParameters();
            parameters.Add("@userId", userId);

            var result = await _dapperHelper.ExecuteStoreProcedureReturnListAsync<UserBriefVM>(storedProcedure, parameters);
            return result;

        }
    }
}
