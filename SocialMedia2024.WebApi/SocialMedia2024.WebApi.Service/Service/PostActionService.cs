using Dapper;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.ViewModel;
namespace SocialMedia2024.WebApi.Service.Service
{
    public class PostActionService : IPostActionService
    {
        private readonly IDapperHelper _dapperHelper;
        private readonly IUnitOfWork _unitOfWork;

        public PostActionService(IUnitOfWork unitOfWork, IDapperHelper dapperHelper)
        {
            _dapperHelper = dapperHelper;
            _unitOfWork = unitOfWork;
        }

        public async Task ModifyPostAction(PostActionVM postAction)
        {
            const string storedProcedure = "Action_Modify";

            var parameters = new DynamicParameters();
            parameters.Add("@PostUserID", postAction.PostUserID);
            parameters.Add("@CurrentUserID", postAction.CurrentUserID);
            parameters.Add("@PostID", postAction.PostID);
            parameters.Add("@ReactionTypeID", postAction.ReactionTypeID);

            await _dapperHelper.ExecuteNonReturn(storedProcedure, parameters);
        }

        public async Task<IEnumerable<PostAction>> GetUserPostActions(string userId)
        {
            string storedProcedure = "Action_Get";

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);

            var result = await _dapperHelper.ExecuteStoreProcedureReturnListAsync<PostAction>(storedProcedure, parameters);
            return result;
        }
    }
}
