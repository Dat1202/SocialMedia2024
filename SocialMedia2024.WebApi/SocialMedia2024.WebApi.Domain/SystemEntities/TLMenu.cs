using SocialMedia2024.WebApi.Domain.BaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Domain.SystemEntities
{
    public class TLMenu : BaseModel
    {
        public string MenuName {  get; set; }
        public string MenuLink { get; set; }
        public string MenuIcon { get; set; }

    }
}
