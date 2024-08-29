using Azure;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NLog;
using SocialMedia2024.WebApi.Middleware;
using SocialMedia2024.WebApi.Service;
using SocialMedia2024.WebApi.ViewModel;
using System.Collections.Generic;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SocialMedia2024.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class HomeController : HandleController
    {
        private readonly ITLMenuService _ITLMenuService;

        public HomeController(ITLMenuService ITLMenuService, IErrorCodeService errorService)
       : base(errorService) 
        {
            _ITLMenuService = ITLMenuService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTest()
        {

            var menuItems = await _ITLMenuService.GetAllDapperStored();
            if (menuItems == null || menuItems.Count() == 0)
            {
                return await ResponseError("Test");
            }
            return await ResponseGet(menuItems);
        }
    }
}
