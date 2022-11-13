using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Dtos;
using PortfolioAPI.Entities;
using PortfolioAPI.Repositories;

namespace PortfolioAPI.Controllers {
    [ApiController]
    [Route("minesweeper/games")]
    public class MinesweeperController : ControllerBase {
        private readonly IRepository repository;

        public MinesweeperController(IRepository repository) {
            this.repository = repository;
        }

        // GET /minesweeper/games/leaderboard/{difficulty}/{limit}
        // difficulty = the difficulty of the game levels sought
        // limit = the number of games to display, at maximum
        [HttpGet("leaderboard/{difficulty=0}/{limit=5}")]
        public async Task<ActionResult<IEnumerable<GameDto>>> GetMinesweeperGameLeaderboardAsync(int difficulty, int limit) {
            // TODO: implement GameDifficulty enum bounds checker 
            // TODO: implement limit to number of scores to display 
            var games = (await repository.GetMinesweeperGameLeaderboardAsync((GameDifficulty) difficulty, limit))
                        .Select(game => game.AsDto());
            if (games is null) { return NotFound(); }
            return Ok(games);
        }

        // GET /minesweeper/games/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetMinesweeperGameAsync(Guid id) {
            var game = await repository.GetMinesweeperGameAsync(id);
            if (game is null) { return NotFound(); }
            return Ok(game.AsDto());
        }

        // POST /minesweeper/games
        [HttpPost]
        public async Task<ActionResult<GameDto>> CreateMinesweeperGameAsync(CreateGameDto cgd) {
            GameData game = new(){
                id = Guid.NewGuid(),
                username = cgd.username,
                difficulty = cgd.difficulty,
                timeTaken = cgd.timeTaken,
                datePlayed = cgd.datePlayed
            };
            await repository.CreateMinesweeperGameAsync(game);

            return CreatedAtAction(nameof(GetMinesweeperGameAsync), new { id = game.id }, game.AsDto());
        }

        // PUT /minesweeper/games/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMinesweeperGameAsync(Guid id, UpdateGameDto ugd) {
            var existingGame = await repository.GetMinesweeperGameAsync(id);
            if (existingGame is null) { return NotFound(); }

            GameData updatedGame = existingGame with {
                username = ugd.username,
                difficulty = ugd.difficulty,
                timeTaken = ugd.timeTaken,
                datePlayed = ugd.datePlayed
            };

            await repository.UpdateMinesweeperGameAsync(updatedGame);

            return NoContent();
        }

        // DELETE /minesweeper/games/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMinesweeperGameAsync(Guid id) {
            var existingGame = await repository.GetMinesweeperGameAsync(id);
            if (existingGame is null) { return NotFound(); }
            await repository.DeleteMinesweeperGameAsync(id);
            return NoContent();
        }
    }
}