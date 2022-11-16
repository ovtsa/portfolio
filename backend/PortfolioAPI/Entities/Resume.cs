using MongoDB.Bson;

namespace PortfolioAPI.Entities {
    public record Resume {
        public Guid id { get; init; }
        public string name { get; init; }
        public string extension { get; init; }
        public byte[] binaryData { get; init; }
    }
}