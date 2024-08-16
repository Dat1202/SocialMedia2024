﻿using SocialMedia2024.Domain.Enum;
using SocialMedia2024.WebApi.Domain.BaseEntities;
using SocialMedia2024.WebApi.Domain.Enum;

namespace SocialMedia2024.Domain.Entities
{
    public class PostAction : BaseModel
    {
        public ReactionType ReactionTypeID { get; set; } = ReactionType.Like;
        public Active Active { get; set; }
        public int PostID { get; set; }
        public required Post Post { get; set; }
        public string UserID { get; set; }
        public required User User { get; set; }
    }
}
