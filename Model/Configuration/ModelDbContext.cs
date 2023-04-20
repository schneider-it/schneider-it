using Model.Entities;
using Model.Entities.Authentication;

namespace Model.Configuration;

public class ModelDbContext : DbContext {
    public ModelDbContext(DbContextOptions<ModelDbContext> options) : base(options) {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<RoleClaim> RoleClaims { get; set; }
    
    public DbSet<CategoryNode> CategoryNodes { get; set; }
    public DbSet<ContentNode> ContentNodes { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<Node> Nodes { get; set; }
    public DbSet<UserEditsNode> UserEditsNodes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder) {
        
        // UNIQUE

        builder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        builder.Entity<Role>()
            .HasIndex(r => r.Identifier)
            .IsUnique();

        // HAS KEY

        builder.Entity<RoleClaim>()
            .HasKey(rc => new { rc.UserId, rc.RoleId });

        builder.Entity<UserEditsNode>()
            .HasKey(uen => new { uen.UserId, uen.NodeId, uen.EditedAt });
        
        // RELATIONSHIPS

        builder.Entity<Node>()
            .HasOne(n => n.ParentNode)
            .WithMany(n => n.ChildNodes)
            .HasForeignKey(n => n.ParentNodeId);
        
        builder.Entity<Node>()
            .HasOne(n => n.Image)
            .WithMany()
            .HasForeignKey(n => n.ImageId);

        builder.Entity<UserEditsNode>()
            .HasOne(uen => uen.User)
            .WithMany(u => u.EditedNodes)
            .HasForeignKey(uen => uen.UserId);
        
        builder.Entity<UserEditsNode>()
            .HasOne(uen => uen.Node)
            .WithMany(n => n.Edits)
            .HasForeignKey(uen => uen.NodeId);

        builder.Entity<RoleClaim>()
            .HasOne(rc => rc.Role)
            .WithMany(r => r.RoleClaims)
            .HasForeignKey(rc => rc.RoleId);

        builder.Entity<RoleClaim>()
            .HasOne(rc => rc.User)
            .WithMany(u => u.RoleClaims)
            .HasForeignKey(rc => rc.UserId);
        
        // OTHER
        // SEEDING
        builder.Entity<Role>()
            .HasData(
                new Role { Id = 1, Identifier = "Administrator", Description = "Can do anything" },
                new Role { Id = 2, Identifier = "Moderator", Description = "Can give roles up to Moderator" },
                new Role { Id = 3, Identifier = "Creator", Description = "Can create and edit pages" },
                new Role { Id = 4, Identifier = "Translator", Description = "Can translate pages in his languages" },
                new Role { Id = 5, Identifier = "Commentator", Description = "Can request changes with comments" }
            );
        
        // ENUM
        builder.Entity<UserEditsNode>().Property(uen => uen.EditType).HasConversion<string>();
        
    }
}