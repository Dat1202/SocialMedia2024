using Microsoft.EntityFrameworkCore;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class ErrorCodeService : IErrorCodeService
    {
        private readonly SocialMedia2024DbContext _context;

        public ErrorCodeService(SocialMedia2024DbContext context)
        {
            _context = context;
        }

        public async Task<string?> GetMessageContent(string messageCode)
        {
            var error = await _context.MessageResponse
               .Where(e => e.MessageCode == messageCode)
               .FirstOrDefaultAsync();

            return error?.MessageContent;
        }
    }
}
