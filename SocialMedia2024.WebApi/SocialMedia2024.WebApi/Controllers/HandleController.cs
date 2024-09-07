using Alachisoft.NCache.Common.ErrorHandling;
using AutoMapper;
using log4net.Extended.Core;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Domain.SystemEntities;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.ViewModel;

namespace SocialMedia2024.WebApi.Controllers
{
    [ApiController] 
    public class HandleController : ControllerBase
    {
        private readonly IErrorCodeService _errorService;
        private readonly IMapper _mapper;

        public HandleController(IErrorCodeService errorService, IMapper mapper) 
        {
            _mapper = mapper;
            _errorService = errorService;
        }

        protected async Task<IActionResult> ResponseGet<T>(T data)
        {
            var response = new ApiResponse<T>(data);

            return Ok(response);
        }

        protected async Task<IActionResult> HandleError(string errorCode, Func<ApiResponse<ErrorVM>, IActionResult> errorResponse)
        {
            SystemError error = await _errorService.GetErrorMessageAsync(errorCode);

            if (error == null)
            {
                return NotFound("Error code not found");
            }

            ErrorVM errorVM = _mapper.Map<ErrorVM>(error);
            var response = new ApiResponse<ErrorVM>(errorVM);

            return errorResponse(response);
        }
        protected Task<IActionResult> ResponseError(string errorCode)
        {
            return HandleError(errorCode, response => Ok(response));
        }

        protected Task<IActionResult> NotFoundError(string errorCode)
        {
            return HandleError(errorCode, response => NotFound(response));
        }

        protected Task<IActionResult> UnauthorizedError(string errorCode)
        {
            return HandleError(errorCode, response => Unauthorized(response));
        }

    }
}
