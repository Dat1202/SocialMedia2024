using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Service.ViewModel
{
    public class UserBriefVM
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Avatar { get; set; }
        public int ChatGroupId { get; set; }
    }
}
