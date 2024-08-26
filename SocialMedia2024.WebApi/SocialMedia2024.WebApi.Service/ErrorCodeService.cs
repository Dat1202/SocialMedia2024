using Microsoft.EntityFrameworkCore;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Service
{
    public class ErrorCodeService : IErrorCodeService
    {
        private readonly SocialMedia2024DbContext _context;

        public ErrorCodeService(SocialMedia2024DbContext context)
        {
            _context = context;
        }

        public async Task<SystemError> GetErrorMessageAsync(string errorCode)
        {

            var error = await _context.SystemErrors.FirstOrDefaultAsync(e => e.ErrorCode == errorCode);
            return error;
        }
    }
}
