using SocialMedia2024.WebApi.Domain.SystemEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Service
{
    public interface IErrorCodeService
    {
        Task<SystemError> GetErrorMessageAsync(string errorCode);
    }
}
