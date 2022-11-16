using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PortfolioAPI.Repositories;

using PortfolioAPI.Entities;
using PortfolioAPI.Dtos;
using Microsoft.AspNetCore.Server.HttpSys;
using ZstdSharp;

namespace PortfolioAPI.Controllers {
    [ApiController]
    [Route("resume")]
    public class ResumeController : ControllerBase {
        private readonly IRepository repository;
        
        public ResumeController(IRepository repository) {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<ResumeDto>> GetResumeAsync() {
            Resume? resume = await repository.GetResumeAsync();
            if (resume is null) { return NotFound(); }
            return Ok(resume.AsDto());
        }
    }
}