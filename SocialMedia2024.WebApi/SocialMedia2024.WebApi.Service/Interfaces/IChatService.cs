using SocialMedia2024.WebApi.Service.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface IChatService
    {
        Task<IEnumerable<UserBriefVM>> GetRecentChatUsers(string userId);
    }
}
