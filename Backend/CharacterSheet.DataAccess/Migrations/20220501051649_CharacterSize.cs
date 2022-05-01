using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CharacterSheet.DataAccess.Migrations
{
    public partial class CharacterSize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "Characters");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Characters",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<short>(
                name: "Size_Feet",
                table: "Characters",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Size_Inch",
                table: "Characters",
                type: "REAL",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size_Feet",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Size_Inch",
                table: "Characters");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Characters",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<float>(
                name: "Size",
                table: "Characters",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
