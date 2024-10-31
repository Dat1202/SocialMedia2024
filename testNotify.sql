Alter proc Get_Notify @Current_User nvarchar(450)
as
begin
	SELECT (select u.LastName + '' + u.FirstName from [User] where Id = n.UserID) as SenderName, 
	u.Avatar , n.PostID, n.CreateAt, case 
					when pa.ReactionTypeID = 1 then N'thích'
					when pa.ReactionTypeID = 2 then N'yêu thích'
					when pa.ReactionTypeID = 3 then N'haha'
					when pa.ReactionTypeID = 4 then N'wow'
					when pa.ReactionTypeID = 5 then N'buồn'
					when pa.ReactionTypeID = 6 then N'phẫn nộ'
				END
			as reaction
	FROM Notification n left join Post p on n.PostID = p.ID
	left join PostAction pa on pa.PostID = p.ID 
	left join [User] u on u.Id = n.UserID
	where p.UserID like @Current_User--curent user
	and n.UserID <> @Current_User
	order by n.CreateAt
end

exec Get_Notify 'f2f5a505-9732-4710-992a-9fc845e42e20'

SELECT * FROM Notification 
SELECT * FROM PostAction
SELECT * FROM Post p
select * from [User] 
--delete Notification
--delete PostAction