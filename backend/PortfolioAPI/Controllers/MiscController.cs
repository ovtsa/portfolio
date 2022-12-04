using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PortfolioAPI.Repositories;

using PortfolioAPI.Entities;
using PortfolioAPI.Dtos;
using Microsoft.AspNetCore.Server.HttpSys;
using ZstdSharp;

namespace PortfolioAPI.Controllers {
    [ApiController]
    [Route("misc")]
    public class MiscController : ControllerBase {
        private readonly IRepository repository;
        
        public MiscController(IRepository repository) {
            this.repository = repository;
        }

        [HttpPost]
        [Route("initdb")]
        public async Task InitializeDatabaseAsync() {
            await this.repository.Initialize();
        }

        [HttpPost]
        [Route("cleardb")]
        public async Task ClearDatabaseAsync() {
            await this.repository.Clear();
        }
    }
}