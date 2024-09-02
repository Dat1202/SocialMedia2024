
namespace SocialMedia2024.WebApi.ViewModel
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public ErrorVM? Error { get; set; }
        public T? Data { get; set; }

        public ApiResponse(ErrorVM error)
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


        public ApiResponse(T data, ErrorVM error)
        {
            Success = false;
            Data = data;
            Error = error;
        }
    }
}
