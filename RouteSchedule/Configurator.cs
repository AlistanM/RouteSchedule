using RouteSchedule.Sql;

namespace RouteSchedule
{
    public class Configurator
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>();
        }
    }
}
