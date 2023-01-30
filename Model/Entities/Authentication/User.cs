namespace Model.Entities.Authentication;

[Table("USERS")]
public class User {
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("USER_ID")]
    public int Id { get; set; }

    [Required]
    [StringLength(32)]
    [MinLength(4)]
    [MaxLength(32)]
    [Column("USERNAME")]
    public string Username { get; set; } = null!;

    [Required]
    [EmailAddress]
    [StringLength(50)]
    [DataType(DataType.EmailAddress)]
    [Column("EMAIL")]
    public string Email { get; set; } = null!;


    [Required]
    [DataType(DataType.Text)]
    [MinLength(8)]
    [Column("PASSWORD_HASH")]
    public string PasswordHash { get; set; } = null!;

    [Required]
    [NotMapped]
    [MinLength(8)]
    public string LoginPassword { get; set; } = null!;
    
    public List<RoleClaim> RoleClaims { get; set; } = new();

    [NotMapped] 
    public IEnumerable<string> PlainRoles => RoleClaims.Select(x => x.Role.Identifier);
    
    public User ClearSensitiveData() {
        // PasswordHash = null!;
        return this;
    }

    public static string HashPassword(string plainPassword) {
        var salt = BC.GenerateSalt(8);
        return BC.HashPassword(plainPassword, salt);
    }

    public static bool VerifyPassword(string plainPassword, string hashedPassword) {
        return BC.Verify(plainPassword, hashedPassword);
    }
}