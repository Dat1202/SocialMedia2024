USE [SocialMediaDB]
GO

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
GO



