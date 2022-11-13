using PortfolioAPI.Entities;
using MongoDB.Driver;
using MongoDB.Bson;

namespace PortfolioAPI.Repositories {
    public class MongoDbMinesweeperRepository : IRepository {
        private const string databaseName = "Portfolio_API_DB";
        private const string collectionName = "gameDataCollection";
        private readonly IMongoCollection<GameData> gameDataCollection;
        private readonly FilterDefinitionBuilder<GameData> filterBuilder = Builders<GameData>.Filter;
        private readonly SortDefinitionBuilder<GameData> sortBuilder = Builders<GameData>.Sort;

        public MongoDbMinesweeperRepository(IMongoClient mongoClient) {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            gameDataCollection = database.GetCollection<GameData>(collectionName);
        }

        public async Task<IEnumerable<GameData>> GetMinesweeperGameLeaderboardAsync(GameDifficulty gd, int limit) {
            var filter = filterBuilder.Eq(game => game.difficulty, gd);
            var sort = sortBuilder.Ascending("timeTaken");
            // TODO: implement tiebreaker score decider
            
            return await gameDataCollection.Find(filter).Sort(sort).Limit(limit).ToListAsync();
        }

        public async Task<GameData> GetMinesweeperGameAsync(Guid id) {
            var filter = filterBuilder.Eq(gameData => gameData.id, id);
            return await gameDataCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task CreateMinesweeperGameAsync(GameData gd) {
            await this.gameDataCollection.InsertOneAsync(gd);
        }

        public async Task UpdateMinesweeperGameAsync(GameData gd) {
            var filter = filterBuilder.Eq(existingGameData => existingGameData.id, gd.id);
            await gameDataCollection.ReplaceOneAsync(filter, gd);
        }

        public async Task DeleteMinesweeperGameAsync(Guid id) {
            var filter = filterBuilder.Eq(gameData => gameData.id, id);
            await gameDataCollection.DeleteOneAsync(filter);
        }
    }
}