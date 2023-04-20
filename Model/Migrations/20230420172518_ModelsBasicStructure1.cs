using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Model.Migrations
{
    /// <inheritdoc />
    public partial class ModelsBasicStructure1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CATEGORY_NODES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    CONTENT = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORY_NODES", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CATEGORY_NODES_NODES_BT_Id",
                        column: x => x.Id,
                        principalTable: "NODES_BT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CONTENT_NODES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    CONTENT = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CONTENT_NODES", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CONTENT_NODES_NODES_BT_Id",
                        column: x => x.Id,
                        principalTable: "NODES_BT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CATEGORY_NODES");

            migrationBuilder.DropTable(
                name: "CONTENT_NODES");
        }
    }
}
