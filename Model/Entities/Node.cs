using System.Reflection.Metadata;

namespace Model.Entities;

[Table("NODES_BT")]
public class Node
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Column("TITLE")]
    public string Title { get; set; }
    
    [Column("IMAGE_ID")]
    public int ImageId { get; set; }
    public Image Image { get; set; }
    
    [Column("PARENT_NODE_ID")]
    public int? ParentNodeId { get; set; }
    public Node? ParentNode { get; set; }
    
    public List<Node> ChildNodes { get; set; }
    
    public List<UserEditsNode> Edits { get; set; }
}