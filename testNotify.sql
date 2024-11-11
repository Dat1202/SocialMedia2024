use [SocialMediaDB]

exec Notify_Get '9cd8e6ce-0081-491f-8a7c-561d99a74467' --admin
SELECT * FROM Friend f 
SELECT * FROM Notification
select * from [User] 
SELECT * FROM Post
SELECT * FROM PostAction
declare @Current_User nvarchar(450) = '9cd8e6ce-0081-491f-8a7c-561d99a74467'

update [user]
set FirstName ='dat'
where id = '6f3da0e7-81d8-4e4a-a019-876a8ea3a0cf'
--delete Notification
--delete Friend
--delete PostAction

exec Post_Get 5, 2, '31e213c7-ea6c-44fe-a77d-d7c647180cd9'