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

        protected async Task<IActionResult> HandleMessageContent<T>(string messageCode, T data, Func<ApiResponse<T>, IActionResult> errorResponse)
        {
            string responseData = await _errorService.GetMessageContent(messageCode);

            var response = new ApiResponse<T>(data, responseData);

            return errorResponse(response);
        }   

        protected Task<IActionResult> ResponseSuccess<T>(T data, string messageResponse = null)
        {
            return HandleMessageContent(messageResponse, data, response => Ok(response));
        }

        protected Task<IActionResult> ResponseError(string messageResponse)
        {
            return HandleMessageContent<object>(messageResponse, null, response => BadRequest(response));
        }

        protected Task<IActionResult> NotFoundError(string messageResponse)
        {
            return HandleMessageContent<object>(messageResponse, null, response => NotFound(response));
        }

        protected Task<IActionResult> UnauthorizedError(string messageResponse)
        {
            return HandleMessageContent<object>(messageResponse, null, response => Unauthorized(response));
        }
        protected Task<IActionResult> CreateOK(string messageResponse = null)
        {
            return HandleMessageContent<object>(messageResponse, null, response => NoContent());
        }
    }
}
