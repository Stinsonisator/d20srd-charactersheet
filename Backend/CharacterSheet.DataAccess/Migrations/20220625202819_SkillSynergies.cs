using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CharacterSheet.DataAccess.Migrations
{
    public partial class SkillSynergies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SkillSynergies",
                columns: table => new
                {
                    SourceSkillId = table.Column<long>(type: "bigint", nullable: false),
                    DestinationSkillId = table.Column<long>(type: "bigint", nullable: false),
                    IsConditional = table.Column<bool>(type: "boolean", nullable: false),
                    ConditionDescription = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillSynergies", x => new { x.SourceSkillId, x.DestinationSkillId });
                    table.ForeignKey(
                        name: "FK_SkillSynergies_Skills_DestinationSkillId",
                        column: x => x.DestinationSkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SkillSynergies_Skills_SourceSkillId",
                        column: x => x.SourceSkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SkillSynergies_DestinationSkillId",
                table: "SkillSynergies",
                column: "DestinationSkillId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkillSynergies");
        }
    }
}
