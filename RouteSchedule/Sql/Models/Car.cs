using RouteSchedule.ApiModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RouteSchedule.Sql.Models
{
    [Table("Cars")]
    public class Car
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string? Name { get; set; }

        [Column]
        public int? LoadСapacity { get; set; }

        public static Car FromApi(CarDto dto)
        {
            return new Car { Id = dto.Id, Name = dto.Name, LoadСapacity = dto.LoadСapacity };
        }

        public CarDto ToApi()
        {
            return new CarDto { Id = Id, Name = Name, LoadСapacity = LoadСapacity };
        }
    }
}
