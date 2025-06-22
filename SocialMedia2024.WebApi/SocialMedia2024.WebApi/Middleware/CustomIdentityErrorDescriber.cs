using Microsoft.AspNetCore.Identity;

public class CustomIdentityErrorDescriber : IdentityErrorDescriber
{
    public override IdentityError DuplicateUserName(string userName)
    {
        return new IdentityError
        {
            Code = nameof(DuplicateUserName),
            Description = $"Tài khoản '{userName}' đã được sử dụng."
        };
    }

    public override IdentityError InvalidUserName(string userName)
    {
        if (string.IsNullOrWhiteSpace(userName))
        {
            return new IdentityError
            {
                Code = nameof(InvalidUserName),
                Description = "Tài khoản không được để trống."
            };
        }

        return new IdentityError
        {
            Code = nameof(InvalidUserName),
            Description = $"Tài khoản '{userName}' không hợp lệ."
        };
    }
}
