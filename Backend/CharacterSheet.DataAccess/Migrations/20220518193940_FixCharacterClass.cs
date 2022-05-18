using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CharacterSheet.DataAccess.Migrations
{
    public partial class FixCharacterClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CharacterClass",
                table: "Characters");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_CharacterClassId",
                table: "Characters",
                column: "CharacterClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Characters_CharacterClasses_CharacterClassId",
                table: "Characters",
                column: "CharacterClassId",
                principalTable: "CharacterClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Characters_CharacterClasses_CharacterClassId",
                table: "Characters");

            migrationBuilder.DropIndex(
                name: "IX_Characters_CharacterClassId",
                table: "Characters");

            migrationBuilder.AddColumn<string>(
                name: "CharacterClass",
                table: "Characters",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
