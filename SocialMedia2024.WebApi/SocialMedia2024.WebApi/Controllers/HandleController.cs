using Alachisoft.NCache.Common.ErrorHandling;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Service;
using SocialMedia2024.WebApi.ViewModel;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SocialMedia2024.WebApi.Controllers
{
    public class HandleController : ControllerBase
    {
        private readonly IErrorCodeService _errorService;

        public HandleController(IErrorCodeService errorService) 
        {
            _errorService = errorService;
        }

        protected async Task<IActionResult> ResponseError(string message)
        {

            var error = await _errorService?.GetErrorMessageAsync(message);

            var response = new ApiResponse<SystemError>(error);

            return Ok(response);
        }


        protected async Task<IActionResult> ResponseGet<T>(T data)
        {
            var response = new ApiResponse<T>(data);

            return Ok(response);
        }
    }
}
