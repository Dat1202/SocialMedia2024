using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace SocialMedia2024.WebApi.Service.Interfaces
{
    public interface ICloudinaryService
    {
        Task<List<ImageUploadResult>> UploadImages(List<IFormFile> files);
        Task<List<ImageUploadResult>> UploadImage(IFormFile file);
    }
}
