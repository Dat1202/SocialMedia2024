using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Core.EmailHelper;
using SocialMedia2024.WebApi.Domain.ViewModel;
using SocialMedia2024.WebApi.Service.Interfaces;

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
            if (menuItems == null || !menuItems.Any())
            {
                return await ResponseError("Test");
            }

            //await _emailHelper.SendMail(new Domain.SystemEntities.EmailRequest
            //{
            //    To = "dat120202@gmail.com",
            //    Subject = "Test",
            //    Content = "Test"
            //});
            return await ResponseSuccess(menuItems, "Menu");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string name)
        {
            await _ITLMenuService.Delete(name);
            return NoContent(); 
        }
    }
}
