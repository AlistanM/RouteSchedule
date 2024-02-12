using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RouteSchedule.Sql.Models
{
    [Table("Crews")]
    public class Crew
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(CarID))]
        public Car Car { get; set; }

        [ForeignKey(nameof(DriverID))]
        public Driver Driver { get; set; }

        public int CarID { get; set; }

        public int DriverID { get; set; }
    }
}
