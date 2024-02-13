using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using RouteSchedule.ApiModels;

namespace RouteSchedule.Sql.Models
{
    [Table("Drivers")]
    public class Driver
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public static Driver FromApi(DriverDto dto)
        {
            return new Driver { Id = dto.Id, Name = dto.Name };   
        }

        public DriverDto ToApi()
        {
            return new DriverDto { Id = Id, Name = Name};
        }
    }
}
