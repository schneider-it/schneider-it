namespace Model.Entities;

[Table("CATEGORY_NODES")]
public class CategoryNode : Node
{
    [Column("CONTENT")]
    public string? Content { get; set; }
}