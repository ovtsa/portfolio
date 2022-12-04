using PortfolioAPI.Entities;

namespace PortfolioAPI.Repositories {
    public class InMemMinesweeperRepository : IRepository {
        private readonly List<GameData> games = new() {
            new GameData { id = Guid.NewGuid(), username = "Steve", difficulty = GameDifficulty.EASY,   timeTaken = TimeSpan.FromSeconds(15), datePlayed = DateTimeOffset.Now},
            new GameData { id = Guid.NewGuid(), username = "Joe",   difficulty = GameDifficulty.MEDIUM, timeTaken = TimeSpan.FromSeconds(30), datePlayed = DateTimeOffset.Now},
            new GameData { id = Guid.NewGuid(), username = "Sue",   difficulty = GameDifficulty.HARD,   timeTaken = TimeSpan.FromSeconds(45), datePlayed = DateTimeOffset.Now},
        };

        public async Task<Resume> GetResumeAsync() {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<GameData>> GetMinesweeperGameLeaderboardAsync(GameDifficulty gd, int limit) {
            throw new NotImplementedException();
        }

        public async Task<GameData> GetMinesweeperGameAsync(Guid id) {
            var game = this.games.Where(game => game.id == id).SingleOrDefault();
            return await Task.FromResult(game);
        }

        public async Task CreateMinesweeperGameAsync(GameData gd) {
            games.Add(gd);
            await Task.CompletedTask;
        }

        public async Task UpdateMinesweeperGameAsync(GameData gd) {
            var index = games.FindIndex(existingGame => existingGame.id == gd.id);
            games[index] = gd;
            await Task.CompletedTask;
        }

        public async Task DeleteMinesweeperGameAsync(Guid id) {
            games.RemoveAt(games.FindIndex(existingGame => existingGame.id == id));
            await Task.CompletedTask;
        }

        public async Task Initialize() {
            throw new NotImplementedException();
        }

        public async Task Clear() {
            throw new NotImplementedException();
        }
    }
}