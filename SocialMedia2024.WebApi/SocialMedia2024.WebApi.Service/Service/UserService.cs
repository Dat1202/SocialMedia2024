using Microsoft.AspNetCore.Identity;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Repositories;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public UserService(IUnitOfWork unitOfWork, UserManager<User> userManager) 
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        public async Task<User> ValidateUser(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null) 
            {
                return null;
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user,password);
            if (!isPasswordValid)
            {
                return null;
            }

            return user;
        }

        public async Task<User> GetUserByUsername(string name)
        {
            return await _unitOfWork.Users.GetSingle(u => u.UserName == name);
        }

        public async Task<User> GetUserById(string id)
        {
            return await _unitOfWork.Users.GetSingle(u => u.Id == id);
        }

        public async Task UpdateUserAvatar(string userId,string fileName)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                user.Avatar = fileName;
                _unitOfWork.Users.Update(user);
                await _unitOfWork.Commit();
            }
        }

        public async Task<User> GetUserProfile(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }
    }
}
