using SocialMedia2024.Domain.Entities;
using SocialMedia2024.Data.Persistence;
using SocialMedia2024.WebApi.Data.Repositories;
using SocialMedia2024.WebApi.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Data.Repositories
{
    public class PostMediaRepository: Repository<PostMedia>, IPostMediaRepository
    {
        public PostMediaRepository(SocialMedia2024DbContext socialMedia2024DbContext) : base(socialMedia2024DbContext)
        {
        }
    }
}
