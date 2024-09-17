
namespace SocialMedia2024.WebApi.ViewModel
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string MessageResponse { get; set; }
        public T? Data { get; set; }

        //error response
        public ApiResponse(string error)
        {
            Success = false;
            MessageResponse = error;
            Data = default;
        }

        //sucess response
        public ApiResponse(T data, string messageResponse = null)
        {
            Success = true;
            Data = data;
            MessageResponse = messageResponse;
        }
    }
}
