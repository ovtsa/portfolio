using PortfolioAPI.Entities;
using PortfolioAPI.Dtos;

namespace PortfolioAPI {
    public static class Extensions {
        public static GameDto AsDto(this GameData gd) {
            return new GameDto {
                id = gd.id,
                username = gd.username,
                difficulty = gd.difficulty,
                timeTaken = gd.timeTaken,
                datePlayed = gd.datePlayed
            };
        }
    }
}
