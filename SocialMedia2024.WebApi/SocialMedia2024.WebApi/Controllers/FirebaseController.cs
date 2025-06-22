using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;

namespace SocialMedia2024.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FirebaseController : ControllerBase
    {
        [HttpPost("firebase-token")]
        public async Task<IActionResult> GetFirebaseCustomToken()
        {
            var currentUserId = User.FindFirst("UserId")?.Value;

            string firebaseToken = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(currentUserId);
            return Ok(new { firebaseToken });
        }
    }
}
