using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using SocialMedia2024.WebApi.Service.Interfaces;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;
    private const long MaxImageFileSize = 10 * 1024 * 1024; // 10 MB
    private const long MaxVideoFileSize = 100 * 1024 * 1024; // 100 MB
    private const long MaxRawFileSize = 10 * 1024 * 1024; // 10 MB
    private const int MaxImageMegapixel = 25; // 25 MP
    private const int MaxTransformationImageSize = 100 * 1024 * 1024; // 100 MB for image transformation
    private const int MaxTransformationVideoSize = 40 * 1024 * 1024; // 40 MB for video transformation
    private const int MaxVideoMegapixel = 50;

    public CloudinaryService(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<List<ImageUploadResult>> UploadImage(IFormFile file)
    {
        var uploadResults = new List<ImageUploadResult>();

        if (file.Length > 0)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };

                var result = await _cloudinary.UploadAsync(uploadParams);
                uploadResults.Add(result);
            }
        }

        return uploadResults;
    }

    public async Task<List<ImageUploadResult>> UploadImages(List<IFormFile> files)
    {
        var uploadResults = new List<ImageUploadResult>();

        if(files!= null)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var isVideo = file.ContentType.StartsWith("video/");

                        var uploadParams = isVideo
                        ? new VideoUploadParams { File = new FileDescription(file.FileName, stream) }
                        : new ImageUploadParams { File = new FileDescription(file.FileName, stream) };

                        var result = await _cloudinary.UploadAsync(uploadParams);
                        uploadResults.Add(result);
                    }
                }
            }
        }

        return uploadResults;
    }
}
