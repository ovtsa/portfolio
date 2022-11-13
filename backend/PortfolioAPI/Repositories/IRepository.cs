using PortfolioAPI.Entities;

namespace PortfolioAPI.Repositories {
    public interface IRepository {
        Task<IEnumerable<GameData>> GetMinesweeperGameLeaderboardAsync(GameDifficulty gd, int limit);
        Task<GameData> GetMinesweeperGameAsync(Guid id);
        Task CreateMinesweeperGameAsync(GameData gd);
        Task UpdateMinesweeperGameAsync(GameData gd);
        Task DeleteMinesweeperGameAsync(Guid id);
    }
}