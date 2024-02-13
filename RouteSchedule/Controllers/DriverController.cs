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
    public class DriverController : ControllerBase
    {
        [Route("CreateDriver")]
        [HttpPost]
        public async Task CreateDriver([FromServices] DataContext db, [FromBody] DriverDto dto)
        {
            var driver = Driver.FromApi(dto);
            db.Drivers.Add(driver);
            await db.SaveChangesAsync();
        }

        [Route("UpdateDriver")]
        [HttpPost]
        public async Task UpdateDriver([FromServices] DataContext db, [FromBody] DriverDto dto)
        {
            var driver = Driver.FromApi(dto);
            db.Attach(driver);
            db.Drivers.Update(driver);
            await db.SaveChangesAsync();
        }

        [Route("DeleteDriver")]
        [HttpGet]
        public async Task DeleteDriver([FromServices] DataContext db, [FromQuery] int id)
        {
            var driver = new Driver { Id = id };
            db.Attach(driver); 
            db.Remove(driver);
            await db.SaveChangesAsync();
        }

        [Route("GetDrivers")]
        [HttpGet]
        public async Task<DriverDto[]> GetDrivers([FromServices] DataContext db)
        {
            return (await db.Drivers.ToListAsync()).Select(x => x.ToApi()).ToArray();
        }
    }
}
