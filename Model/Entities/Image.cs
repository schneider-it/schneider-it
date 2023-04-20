namespace Model.Entities;

[Table("IMAGES")]
public class Image
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Column("TITLE")]
    public string Title { get; set; }
    
    [Column("DESCRIPTION")]
    public string Description { get; set; }
    
    [Column("DATA")]
    public byte[] Data { get; set; }
}