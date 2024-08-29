using SocialMedia2024.WebApi.Domain.SystemEntities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SocialMedia2024.WebApi.ViewModel
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public SystemError? Error { get; set; }
        public T? Data { get; set; }

        public ApiResponse(SystemError error)
        {
            Success = false;
            Error = error;
            Data = default;
        }

        public ApiResponse(T data)
        {
            Success = true;
            Data = data;
            Error = null;
        }


        public ApiResponse(T data, SystemError error)
        {
            Success = false;
            Data = data;
            Error = error;
        }
    }
}
