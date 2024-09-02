using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Infrastructure.Repositories;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<User> CheckLogin(string username, string password)
        {
            var user = await _unitOfWork.Users.GetSingle(u => u.Email == username && u.PasswordHash == password);
            return user;
        }

        public async Task<User> FindByUsername(string name)
        {
            return await _unitOfWork.Users.GetSingle(u => u.UserName == name);
        }

        public async Task<User> FindById(string id)
        {
            return await _unitOfWork.Users.GetSingle(u => u.Id == id);
        }
    }
}
