using PortfolioAPI.Entities;

namespace PortfolioAPI.Dtos {
    public record GameDto {
        public Guid id { get; init; }
        public GameDifficulty difficulty { get; init; }
        public string username { get; init; }
        public TimeSpan timeTaken { get; init; }
        public DateTimeOffset datePlayed { get; init; }
    }
}