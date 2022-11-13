using PortfolioAPI.Entities;

namespace PortfolioAPI.Dtos {
    public record CreateGameDto {
        public GameDifficulty difficulty { get; init; }
        public string username { get; init; }
        public TimeSpan timeTaken { get; init; }
        public DateTimeOffset datePlayed { get; init; }
    }
}