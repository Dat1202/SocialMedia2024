using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Core.EmailHelper;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Controllers
{
    [AllowAnonymous]
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class TestController : HandleController
    {
        private readonly IMenuService _ITLMenuService; 
        private readonly IEmailHelper _emailHelper;

        public TestController(IMenuService ITLMenuService, IErrorCodeService errorService, IMapper mapper, IEmailHelper emailHelper) : base(errorService, mapper) 
        {
            _emailHelper = emailHelper;
            _ITLMenuService = ITLMenuService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTest()
        {
            var menuItems = await _ITLMenuService.GetAllDapperSql();
            if (menuItems == null || menuItems.Count() != 0)
            {
                return await ResponseError("Test");
            }

            await _emailHelper.SendMail(new Domain.SystemEntities.EmailRequest
            {
                To = "dat120202@gmail.com",
                Subject = "Test",
                Content = "Test"
            });
            return await ResponseGet(menuItems);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string name)
        {
            await _ITLMenuService.Delete(name);
            return NoContent(); 
        }

    }
}
