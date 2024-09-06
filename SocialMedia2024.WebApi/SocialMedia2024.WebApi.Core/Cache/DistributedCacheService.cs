using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace SocialMedia2024.WebApi.Core.Cache
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
