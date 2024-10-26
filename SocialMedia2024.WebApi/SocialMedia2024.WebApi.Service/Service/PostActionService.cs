using Dapper;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.Interfaces;
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

        public async Task ActionModify(PostAction postAction)
        {
            string sql = "Action_Modify";

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", postAction.UserID);
            parameters.Add("@PostID", postAction.PostID);
            parameters.Add("@ReactionTypeID", postAction.ReactionTypeID);

            await _dapperHelper.ExecuteNonReturn(sql, parameters);
        }

        public async Task<IEnumerable<PostAction>> ActionGet(string userId)
        {
            string sql = "Action_Get";

            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);

            var result = await _dapperHelper.ExecuteStoreProcedureReturnListAsync<PostAction>(sql, parameters);
            return result;
        }
    }
}
