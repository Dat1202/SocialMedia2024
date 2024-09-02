using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class HomeController : HandleController
    {
        private readonly IMenuService _ITLMenuService;

        public HomeController(IMenuService ITLMenuService, IErrorCodeService errorService, IMapper mapper) : base(errorService, mapper) 
        {
            _ITLMenuService = ITLMenuService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTest()
        {
            var menuItems = await _ITLMenuService.GetAllDapperSql();
            if (menuItems == null || menuItems.Count() == 0)
            {
                return await ResponseError("Test");
            }
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
