using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Model.Migrations
{
    /// <inheritdoc />
    public partial class ModelsBasicStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "REGISTERED_AT",
                table: "USERS",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "IMAGES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TITLE = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DESCRIPTION = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DATA = table.Column<byte[]>(type: "longblob", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IMAGES", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "NODES_BT",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TITLE = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IMAGEID = table.Column<int>(name: "IMAGE_ID", type: "int", nullable: false),
                    PARENTNODEID = table.Column<int>(name: "PARENT_NODE_ID", type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NODES_BT", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NODES_BT_IMAGES_IMAGE_ID",
                        column: x => x.IMAGEID,
                        principalTable: "IMAGES",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NODES_BT_NODES_BT_PARENT_NODE_ID",
                        column: x => x.PARENTNODEID,
                        principalTable: "NODES_BT",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "USER_EDITS_NODES",
                columns: table => new
                {
                    USERID = table.Column<int>(name: "USER_ID", type: "int", nullable: false),
                    NODEID = table.Column<int>(name: "NODE_ID", type: "int", nullable: false),
                    EDITEDAT = table.Column<DateTime>(name: "EDITED_AT", type: "datetime(6)", nullable: false),
                    EDITTYPE = table.Column<string>(name: "EDIT_TYPE", type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_EDITS_NODES", x => new { x.USERID, x.NODEID, x.EDITEDAT });
                    table.ForeignKey(
                        name: "FK_USER_EDITS_NODES_NODES_BT_NODE_ID",
                        column: x => x.NODEID,
                        principalTable: "NODES_BT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_USER_EDITS_NODES_USERS_USER_ID",
                        column: x => x.USERID,
                        principalTable: "USERS",
                        principalColumn: "USER_ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "ROLES",
                keyColumn: "ROLE_ID",
                keyValue: 1,
                columns: new[] { "DESCRIPTION", "IDENTIFIER" },
                values: new object[] { "Can do anything", "Administrator" });

            migrationBuilder.InsertData(
                table: "ROLES",
                columns: new[] { "ROLE_ID", "DESCRIPTION", "IDENTIFIER" },
                values: new object[,]
                {
                    { 2, "Can give roles up to Moderator", "Moderator" },
                    { 3, "Can create and edit pages", "Creator" },
                    { 4, "Can translate pages in his languages", "Translator" },
                    { 5, "Can request changes with comments", "Commentator" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_NODES_BT_IMAGE_ID",
                table: "NODES_BT",
                column: "IMAGE_ID");

            migrationBuilder.CreateIndex(
                name: "IX_NODES_BT_PARENT_NODE_ID",
                table: "NODES_BT",
                column: "PARENT_NODE_ID");

            migrationBuilder.CreateIndex(
                name: "IX_USER_EDITS_NODES_NODE_ID",
                table: "USER_EDITS_NODES",
                column: "NODE_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "USER_EDITS_NODES");

            migrationBuilder.DropTable(
                name: "NODES_BT");

            migrationBuilder.DropTable(
                name: "IMAGES");

            migrationBuilder.DeleteData(
                table: "ROLES",
                keyColumn: "ROLE_ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ROLES",
                keyColumn: "ROLE_ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ROLES",
                keyColumn: "ROLE_ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ROLES",
                keyColumn: "ROLE_ID",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "REGISTERED_AT",
                table: "USERS");

            migrationBuilder.UpdateData(
                table: "ROLES",
                keyColumn: "ROLE_ID",
                keyValue: 1,
                columns: new[] { "DESCRIPTION", "IDENTIFIER" },
                values: new object[] { "Administrator", "Admin" });
        }
    }
}
