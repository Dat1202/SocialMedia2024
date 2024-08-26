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

        protected async Task<IActionResult> ResponseData<T>(List<string> message)
        {
            var errors = new List<SystemError>();

            foreach (var item in message)
            {
                var error = await _errorService?.GetErrorMessageAsync(item);
                errors.Add(error);
            }

            var response = new ApiResponse<List<SystemError>>(errors);

            return Ok(response);
        }


        protected async Task<IActionResult> ResponseData<T>(T data)
        {
            var response = new ApiResponse<T>(data);

            return Ok(response);
        }
    }
}
