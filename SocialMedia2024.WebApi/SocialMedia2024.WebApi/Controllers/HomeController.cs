using Microsoft.AspNetCore.Mvc;
using SocialMedia2024.Infrastructure.Persistence;
using SocialMedia2024.WebApi.Service;
namespace SocialMedia2024.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly ITLMenuService _ITLMenuService;

        public HomeController(ITLMenuService ITLMenuService)
        {
            _ITLMenuService = ITLMenuService;
        }

        [HttpGet]
        public async Task<IActionResult> Index() 
        {
            return Ok(await _ITLMenuService.GetAll());
        } 
    }
}
