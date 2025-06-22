using Dapper;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Dapper;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.ViewModel;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class NotificationService : INotificationService
    {
        private readonly IDapperHelper _dapperHelper;

        public NotificationService(IDapperHelper dapperHelper)
        {
            _dapperHelper = dapperHelper;
        }

        public Task<IEnumerable<NotificationVM>> GetUserNotifications(string currentUser)
        {
            const string storedProcedure = "Notify_Get";
            var parameters = new DynamicParameters();
            parameters.Add("@Current_User", currentUser);

            return _dapperHelper.ExecuteStoreProcedureReturnListAsync<NotificationVM>(storedProcedure, parameters);
        }

    }
}
