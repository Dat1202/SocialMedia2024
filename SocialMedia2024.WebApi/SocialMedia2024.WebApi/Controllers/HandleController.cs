using AutoMapper;
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

        protected async Task<IActionResult> ResponseError(string message)
        {

            SystemError error = await _errorService?.GetErrorMessageAsync(message);

            ErrorVM errorVM = _mapper.Map<ErrorVM>(error);

            var response = new ApiResponse<ErrorVM>(errorVM);

            return Ok(response);
        }


        protected async Task<IActionResult> ResponseGet<T>(T data)
        {
            var response = new ApiResponse<T>(data);

            return Ok(response);
        }
    }
}
