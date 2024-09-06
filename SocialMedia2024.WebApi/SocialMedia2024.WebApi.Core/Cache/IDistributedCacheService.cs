namespace SocialMedia2024.WebApi.Core.Cache
{
    public interface IDistributedCacheService
    {
        Task<T> Get<T>(string key);
        Task Remove(string key);
        Task Set<T>(string key, T value);
    }
}