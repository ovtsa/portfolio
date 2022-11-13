namespace PortfolioAPI.Entities {
    public enum GameDifficulty {
        EASY,
        MEDIUM,
        HARD
    }

    public record GameData {
        public Guid id { get; init; }
        public string username { get; init; }
        public GameDifficulty difficulty { get; init; }
        public TimeSpan timeTaken { get; init; }
        public DateTimeOffset datePlayed { get; init; }
    }
}