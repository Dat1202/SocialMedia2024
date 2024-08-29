using Dapper;
using System.Data;

namespace SocialMedia2024.WebApi.Infrastructure.Dapper
{
    public interface IDapperHelper
    {
        Task ExecuteNonReturn(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null);
        Task<T?> ExecuteReturnSingleRow<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null);
        Task<T?> ExecuteReturnSingleValueScalar<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null);
        Task<IEnumerable<T?>> ExecuteSqlReturnList<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null);
        Task<IEnumerable<T>> ExecuteStoreProcedureReturnListAsync<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null);
    }
}