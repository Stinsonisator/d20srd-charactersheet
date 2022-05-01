using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CharacterSheet.DataAccess.Migrations
{
    public partial class CharacterImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Size",
                table: "Characters",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Characters",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Characters");

            migrationBuilder.AlterColumn<short>(
                name: "Size",
                table: "Characters",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "REAL");
        }
    }
}
