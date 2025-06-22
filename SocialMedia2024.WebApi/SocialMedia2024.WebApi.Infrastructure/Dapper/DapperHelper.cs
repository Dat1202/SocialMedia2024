using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using SocialMedia2024.WebApi.Infrastructure.Interfaces;

namespace SocialMedia2024.WebApi.Infrastructure.Dapper
{
    public class DapperHelper : IDapperHelper
    {
        private readonly string _connectionString;

        public DapperHelper(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SocialMediaConnection") ?? string.Empty;
        }

        public async Task ExecuteNonReturn(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(query, param: parameters, dbTransaction);
            }
        }

        public async Task<T?> ExecuteReturnSingleValueScalar<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.ExecuteScalarAsync<T>(query, param: parameters, dbTransaction);
            }
        }

        public async Task<IEnumerable<T?>> ExecuteSqlReturnList<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<T>(query, param: parameters, dbTransaction);
            }
        }

        public async Task<T?> ExecuteReturnSingleRow<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QuerySingleAsync<T>(query, param: parameters, dbTransaction);
            }
        }

        public async Task<IEnumerable<T>> ExecuteStoreProcedureReturnListAsync<T>(string query, DynamicParameters parameters = null, IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<T>(query, parameters, dbTransaction, commandType: CommandType.StoredProcedure);
            }
        }
    }
}