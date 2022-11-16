using PortfolioAPI.Entities;
using PortfolioAPI.DbTools;
using MongoDB.Driver;
using PortfolioAPI.Dtos;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

// TODO: Separate different controllers' functions and collections into separate classes.
// this should not be a monolith class for all mongodb functions
namespace PortfolioAPI.Repositories {
    public class MongoDbRepository : IRepository {
        private const string databaseName = "Portfolio_API_DB";
        private const string gameDataCollectionName = "gameDataCollection";
        private const string resumeCollectionName = "resumeCollection";
        private readonly IMongoCollection<GameData> gameDataCollection;
        private readonly IMongoCollection<Resume> resumeCollection;
        private readonly FilterDefinitionBuilder<GameData> filterBuilder = Builders<GameData>.Filter;
        private readonly SortDefinitionBuilder<GameData> sortBuilder = Builders<GameData>.Sort;

        public MongoDbRepository(IMongoClient mongoClient) {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            gameDataCollection = database.GetCollection<GameData>(gameDataCollectionName);
            resumeCollection = database.GetCollection<Resume>(resumeCollectionName);

            // This only should be run in test environment, not prod
            InsertTestData(database);
        }

        private void InsertTestData(IMongoDatabase database) {
            InitDb initDb = new InitDb(database);
            initDb.InsertTestData();
        }

        public async Task<Resume> GetResumeAsync() {
            var filter = Builders<Resume>.Filter.Eq(resume => resume.name, "Nathan Jobe");
            return await resumeCollection.Find(filter).SingleOrDefaultAsync();
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