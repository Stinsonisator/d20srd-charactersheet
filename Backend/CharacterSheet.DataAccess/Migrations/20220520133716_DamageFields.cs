using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CharacterSheet.DataAccess.Migrations
{
    public partial class DamageFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LethalDamage",
                table: "Characters",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NonlethalDamage",
                table: "Characters",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LethalDamage",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "NonlethalDamage",
                table: "Characters");
        }
    }
}
