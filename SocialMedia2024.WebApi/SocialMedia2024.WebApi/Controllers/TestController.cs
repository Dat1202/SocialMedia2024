using AutoMapper;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Core.EmailHelper;
using SocialMedia2024.WebApi.Service.Interfaces;
using SocialMedia2024.WebApi.Service.Service;

namespace SocialMedia2024.WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]/[action]")]
    public class TestController : HandleController
    {
        private readonly IMenuService _ITLMenuService; 
        private readonly IEmailHelper _emailHelper;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IUserService _userService;

        public TestController(IUserService userService,IMenuService ITLMenuService, IErrorCodeService errorService, IMapper mapper, IEmailHelper emailHelper, ICloudinaryService cloudinaryService) : base(errorService, mapper) 
        {
            _emailHelper = emailHelper;
            _ITLMenuService = ITLMenuService;
            _cloudinaryService = cloudinaryService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTest()
        {
            var menuItems = await _ITLMenuService.GetAll();
            if (menuItems == null || menuItems.Count() == 0)
            {
                return await ResponseError("Test");
            }

            //await _emailHelper.SendMail(new Domain.SystemEntities.EmailRequest
            //{
            //    To = "dat120202@gmail.com",
            //    Subject = "Test",
            //    Content = "Test"
            //});
            return await Response(menuItems);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string name)
        {
            await _ITLMenuService.Delete(name);
            return NoContent(); 
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file provided or file is empty.");
            }
            string userId = "9ad99745-114f-490b-97a3-c489fd958fd2";
            var result = await _cloudinaryService.UploadImageAsync(file);


            if (result.Error != null)
                return BadRequest(result.Error.Message);

            await _userService.SaveImage(userId, result.Url.ToString());

            return Ok(result.Url.ToString());
        }

        [HttpPost("upload/multiple")]
        public async Task<IActionResult> UploadImages(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("No files provided or files are empty.");
            }

            string userId = "9ad99745-114f-490b-97a3-c489fd958fd2";

            var resultList = await _cloudinaryService.UploadImagesAsync(files);

            foreach (var result in resultList)
            {
                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            foreach (var result in resultList)
            {
                await _userService.SaveImage(userId, result.Url.ToString());
            }

            var urls = resultList.Select(r => r.Url.ToString()).ToList();
            return Ok(urls);
        }

    }
}
