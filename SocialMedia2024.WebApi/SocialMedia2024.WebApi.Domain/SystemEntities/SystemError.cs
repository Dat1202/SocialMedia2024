using SocialMedia2024.WebApi.Domain.BaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class SystemError : BaseModel
    {
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}
