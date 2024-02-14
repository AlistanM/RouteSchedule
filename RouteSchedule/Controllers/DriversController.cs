using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteSchedule.ApiModels;
using RouteSchedule.Sql;
using RouteSchedule.Sql.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RouteSchedule.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly DataContext _db;

        public DriversController(DataContext db)
        {
            _db = db;
        }

        [Route("Create")]
        [HttpPost]
        public async Task CreateDriver([FromBody] DriverDto dto)
        {
            var driver = Driver.FromApi(dto);
            _db.Drivers.Add(driver);
            await _db.SaveChangesAsync();
        }

        [Route("Update")]
        [HttpPost]
        public async Task UpdateDriver([FromBody] DriverDto dto)
        {
            var driver = Driver.FromApi(dto);
            _db.Attach(driver);
            _db.Drivers.Update(driver);
            await _db.SaveChangesAsync();
        }

        [Route("Delete")]
        [HttpGet]
        public async Task DeleteDriver([FromQuery] int id)
        {
            var driver = new Driver { Id = id };
            _db.Attach(driver); 
            _db.Remove(driver);
            await _db.SaveChangesAsync();
        }

        [Route("GetAll")]
        [HttpGet]
        public async Task<DriverDto[]> GetDrivers()
        {
            return (await _db.Drivers.ToListAsync()).Select(x => x.ToApi()).ToArray();
        }

        [Route("Get")]
        [HttpGet]
        public async Task<DriverDto> GetDriver([FromQuery] int id)
        {
            return (await _db.Drivers.FirstOrDefaultAsync(x => x.Id == id)).ToApi();
        }

        [Route("GetSignature")]
        [HttpGet]
        public List<string> GetSignature()
        {
            return typeof(DriverDto).GetProperties().Select(x => x.Name).ToList();
        }
    }
}
