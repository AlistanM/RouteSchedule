using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteSchedule.ApiModels;
using RouteSchedule.Migrations;
using RouteSchedule.Sql;
using RouteSchedule.Sql.Models;
using System.Runtime.CompilerServices;

namespace RouteSchedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarsController : ControllerBase
    {

        private readonly DataContext _db;
        public CarsController(DataContext db) {
            _db = db;
        }


        [Route("Create")]
        [HttpPost]
        public async Task CreateCar([FromBody] CarDto dto)
        {
            var car = Car.FromApi(dto);
            _db.Cars.Add(car);
            await _db.SaveChangesAsync();
        }

        [Route("Update")]
        [HttpPost]
        public async Task UpdateCar([FromBody] CarDto dto)
        {
            var car = Car.FromApi(dto);
            _db.Attach(car);
            _db.Cars.Update(car);
            await _db.SaveChangesAsync();
        }


        [Route("Delete")]
        [HttpGet]
        public async Task DeleteCar([FromQuery] int id)
        {
            var car = new Car { Id = id };
            _db.Attach(car);
            _db.Remove(car);
            await _db.SaveChangesAsync();
        }

        [Route("GetAll")]
        [HttpGet]
        public async Task<CarDto[]> GetCars()
        {
            return (await _db.Cars.ToListAsync()).Select(x => x.ToApi()).ToArray();
        }

        [Route("Get")]
        [HttpGet]
        public async Task<CarDto> GetCar([FromQuery] int id)
        {
            return (await _db.Cars.FirstOrDefaultAsync(x=> x.Id == id)).ToApi();
        }
    }
}
