using System.Text.Json;
using SocialMedia2024.WebApi.ViewModel;

namespace SocialMedia2024.WebApi.Middleware
{
    public class GlobalExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _requestDelegate;
        private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

        public GlobalExceptionHandlerMiddleware(RequestDelegate requestDelegate, ILogger<GlobalExceptionHandlerMiddleware> logger)
        {
            _requestDelegate = requestDelegate;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _requestDelegate(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = exception switch
                {
                    BadRequestException => StatusCodes.Status400BadRequest,
                    NotFoundException => StatusCodes.Status404NotFound,
                    ValidationException => StatusCodes.Status422UnprocessableEntity,
                    _ => StatusCodes.Status500InternalServerError   
                };

                var response = new Result
                {
                    ErrorMessage = exception is ValidationException errorMessage ? (errorMessage.AdditionalData != null ? errorMessage.AdditionalData?.ErrorMessage : exception.Message) : "",

                    ErrorCode = exception is ValidationException ErrorCode
                    ? (ErrorCode.AdditionalData != null ? ErrorCode.AdditionalData?.ErrorCode : "") : "",

                    Data = []
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
    }
}
