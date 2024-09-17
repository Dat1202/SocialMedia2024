using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

        protected async Task<IActionResult> Response<T>(T data, string errorCode = null)
        {
            string messageResponse = await _errorService.GetMessageContent(errorCode);

            var response = new ApiResponse<T>(data, messageResponse);

            return Ok(response);
        }

        protected async Task<IActionResult> HandleError(string messageCode, Func<ApiResponse<ErrorVM>, IActionResult> errorResponse)
        {
            string responseData = await _errorService.GetMessageContent(messageCode);

            var response = new ApiResponse<ErrorVM>(responseData);

            return errorResponse(response);
        }

        protected Task<IActionResult> ResponseError(string messageResponse)
        {
            return HandleError(messageResponse, response => BadRequest(response));
        }

        protected Task<IActionResult> NotFoundError(string messageResponse)
        {
            return HandleError(messageResponse, response => NotFound(response));
        }

        protected Task<IActionResult> UnauthorizedError(string messageResponse)
        {
            return HandleError(messageResponse, response => Unauthorized(response));
        }

    }
}
