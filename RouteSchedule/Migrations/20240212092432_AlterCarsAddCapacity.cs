using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RouteSchedule.Migrations
{
    /// <inheritdoc />
    public partial class AlterCarsAddCapacity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LoadСapacity",
                table: "Cars",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoadСapacity",
                table: "Cars");
        }
    }
}
