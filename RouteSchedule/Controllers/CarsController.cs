using Microsoft.AspNetCore.Mvc;
using RouteSchedule.ApiModels;
using RouteSchedule.Migrations;
using RouteSchedule.Sql;
using RouteSchedule.Sql.Models;

namespace RouteSchedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarsController : ControllerBase
    {
        [Route("CreateCar")]
        [HttpPost]
        public async Task CreateCar([FromServices] DataContext db, [FromBody]CarDto dto)
        {
            var car = Car.FromApi(dto);
            db.Cars.Add(car);
            await db.SaveChangesAsync();
        }

        [Route("UpdateCar")]
        [HttpPost]
        public async Task UpdateCar([FromServices] DataContext db, [FromBody] CarDto dto)
        {
            var car = Car.FromApi(dto);
            db.Attach(car);
            db.Cars.Update(car);
            await db.SaveChangesAsync();
        }


        [Route("DeleteCar")]
        [HttpGet]
        public async Task DeleteCar([FromServices] DataContext db, [FromQuery]int id)
        {
            var car = new Car { Id = id };
            db.Attach(car);
            db.Remove(car);
            await db.SaveChangesAsync();
        }

    }
}
