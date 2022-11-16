using System.Globalization;
using MongoDB.Driver;

namespace PortfolioAPI.DbTools {
    using MongoDB.Bson;
    using PortfolioAPI.Entities;
    public class InitDb {
        private const string gameDataCollectionName = "gameDataCollection";
        private const string resumeCollectionName = "resumeCollection";
        private IMongoCollection<GameData> gameDataCollection;
        private IMongoCollection<Resume> resumeCollection;
        

        public InitDb(IMongoDatabase mongoDatabase) {
            mongoDatabase.DropCollection(gameDataCollectionName);
            mongoDatabase.DropCollection(resumeCollectionName);
            gameDataCollection = mongoDatabase.GetCollection<GameData>(gameDataCollectionName);
            resumeCollection = mongoDatabase.GetCollection<Resume>(resumeCollectionName);
        }

        public async Task InsertTestData() {
            Random rnd = new Random();

            // love you guys
            string[] names = {
                "Jon Snead", "David Bratton", "Owen Dowell", 
                "Allwyn Kancherla", "Michael Honeycutt", "Brandon Perry", 
                "Peter Linton", "Hugh Linton", "Daniel Linton", "Stephen Dagher"
            };

            List<GameData> gd = new List<GameData>();

            for (int i = 0; i < 200; i++) {
                gd.Add(
                    new GameData {
                        id = Guid.NewGuid(),
                        username = names[rnd.Next(names.Length)],
                        difficulty = (GameDifficulty) rnd.Next(Enum.GetNames(typeof (GameDifficulty)).Length),
                        timeTaken = new TimeSpan(rnd.Next(24), rnd.Next(60), rnd.Next(60)),
                        datePlayed = new DateTimeOffset(DateTime.UtcNow).Subtract(
                            new TimeSpan(
                                rnd.Next(100),  // days
                                rnd.Next(24),   // hours
                                rnd.Next(60),   // minutes 
                                rnd.Next(60),   // seconds 
                                rnd.Next(1000)) // milliseconds 
                        )
                    }
                );
            }

            // convert resume to binary data in the resume object 
            FileStream stream = File.OpenRead("DatabaseTools/resume.docx");
            byte[] fileBinary = new byte[stream.Length];
            stream.Read(fileBinary, 0, fileBinary.Length);
            stream.Close();

            Resume resume = new Resume {
                id = Guid.NewGuid(),
                name = "Nathan Jobe",
                extension = "docx",
                binaryData = fileBinary,
            };

            await gameDataCollection.InsertManyAsync(gd);
            await resumeCollection.InsertOneAsync(resume);
        }
    }
}