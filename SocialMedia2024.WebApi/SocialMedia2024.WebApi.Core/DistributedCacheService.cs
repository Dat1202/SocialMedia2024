using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMedia2024.WebApi.Core
{
    public class DistributedCacheService : IDistributedCacheService
    {
        private readonly IDistributedCache _distributedCache;

        public DistributedCacheService(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }

        public async Task Set<T>(string key, T value)
        {
            await _distributedCache.SetStringAsync(key, JsonConvert.SerializeObject(value), new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(3),
                SlidingExpiration = TimeSpan.FromHours(1),
            });
        }

        public async Task<T> Get<T>(string key)
        {
            string value = await _distributedCache.GetStringAsync(key);

            if (!string.IsNullOrEmpty(value))
            {
                    return JsonConvert.DeserializeObject<T>(value);
            }
            return default;
        }

        public async Task Remove(string key)
        {
            await _distributedCache.RemoveAsync(key);
        }
    }
}
