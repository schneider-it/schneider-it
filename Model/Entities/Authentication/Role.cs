namespace Model.Entities.Authentication;

[Table("ROLES")]
public class Role {
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("ROLE_ID")]
    public int Id { get; set; }

    [Required] 
    [Column("IDENTIFIER")] 
    public string Identifier { get; set; } = null!;


    [Column("DESCRIPTION")] 
    public string? Description { get; set; }

    public List<RoleClaim> RoleClaims { get; set; } = new();

    [NotMapped] 
    public IEnumerable<User> Users => RoleClaims.Select(rc => rc.User);
}