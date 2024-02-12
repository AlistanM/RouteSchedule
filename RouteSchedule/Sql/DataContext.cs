using Microsoft.EntityFrameworkCore;
using RouteSchedule.Sql.Models;
using System.Reflection;

namespace RouteSchedule.Sql
{
    public class DataContext : DbContext
    {
        public DbSet<Car> Cars { get; set;}
        public DbSet<Driver> Drivers { get; set;}
        public DbSet<Crew> Crews { get; set;}

        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string path = Assembly.GetAssembly(typeof(DataContext)).Location;
            path = Path.GetDirectoryName(path);
            optionsBuilder.UseSqlite($"Data Source = {Path.Combine(path, "data.db")}");
        }
    }
}
