USE [SocialMediaDB]
GO

delete [MessageResponse]
INSERT INTO [dbo].[MessageResponse]
           ([MessageCode]
           ,[MessageContent]
           ,[CreateAt])
     VALUES
           ('LoginSuccess'
           ,N'Đăng nhập thành công'
           ,GETDATE())

	INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('PostSuccess'
    ,N'Tạo bài viết thành công'
    ,GETDATE())

	INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('CreateSuccesUser'
    ,N'Tạo tài khoản thành công'
    ,GETDATE())

		INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('UploadAvatarSuccess'
    ,N'Cập nhật avatar thành công'
    ,GETDATE())

	INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('CreateSuccesUser'
    ,N'Tạo tài khoản thành công'
    ,GETDATE())

	INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('InvalidUsername'
    ,N'Chưa nhập tên đăng nhập'
    ,GETDATE())

	INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('InvalidPassword'
    ,N'Chưa nhập mật khẩu'
    ,GETDATE())

	INSERT INTO [dbo].[MessageResponse]
    ([MessageCode]
    ,[MessageContent]
    ,[CreateAt])
     VALUES
    ('IncorrectUser'
    ,N'Thông tin đăng nhập sai'
    ,GETDATE())
GO



