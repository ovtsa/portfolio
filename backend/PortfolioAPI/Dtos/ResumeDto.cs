using MongoDB.Bson;

namespace PortfolioAPI.Dtos {
    public record ResumeDto {
        public Guid id { get; init; }
        public string name { get; init; }
        public string extension { get; init; }
        public byte[] binaryData { get; init; }
    }
}