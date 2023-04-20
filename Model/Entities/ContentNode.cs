namespace Model.Entities;

[Table("CONTENT_NODES")]
public class ContentNode : Node
{
    [Column("CONTENT")]
    [MinLength(200)]
    public string Content { get; set; }
}