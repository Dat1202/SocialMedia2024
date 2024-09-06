using Microsoft.AspNetCore.Identity;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Data.Interfaces;
using SocialMedia2024.WebApi.Domain.Enum;
using SocialMedia2024.WebApi.Service.Interfaces;

namespace SocialMedia2024.WebApi.Service.Service
{
    public class FriendService : IFriendService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public FriendService(IUnitOfWork unitOfWork, UserManager<User> userManager) 
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        public async Task AcceptFriend(string currentUser, string friendId)
        {
            var existingFriend = await _unitOfWork.Friend.ExistFriend(currentUser, friendId);

            if (existingFriend != null)
            {
                existingFriend.Status = Status.Accepted;
                existingFriend.UpdateAt = DateTime.Now;
                _unitOfWork.Friend.Update(existingFriend);
            }
            await _unitOfWork.Commit();
        }

        public async Task AddFriend(string currentUser, string friendId)
        {
            Friend newFriend = new Friend
            {
                UserFollowerID = currentUser,
                UserFollowingID = friendId,
                Status = Status.Pending,
            };

            await _unitOfWork.Friend.Add(newFriend);
            await _unitOfWork.Commit();
        }

        public async Task BlockedFriend(string currentUser, string friendId)
        {
            var existingFriend = await _unitOfWork.Friend.ExistFriend(currentUser, friendId);

            if (existingFriend != null)
            {
                existingFriend.Status = Status.Blocked;
                existingFriend.UpdateAt = DateTime.Now;
                _unitOfWork.Friend.Update(existingFriend);
            }
            await _unitOfWork.Commit();
        }

        public async Task DeniedFriend(string currentUser, string friendId)
        {
            var existingFriend = await _unitOfWork.Friend.ExistFriend(currentUser, friendId);

            if (existingFriend != null)
            {
                existingFriend.Status = Status.Denied;
                existingFriend.UpdateAt = DateTime.Now;
                _unitOfWork.Friend.Update(existingFriend);
            }
            await _unitOfWork.Commit();
        }
    }
}
