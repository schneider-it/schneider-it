using Model.Entities.Authentication;

namespace Model.Entities;

[Table("USER_EDITS_NODES")]
public class UserEditsNode
{
    [Column("USER_ID")]
    public int UserId { get; set; }
    public User User { get; set; }
    
    [Column("NODE_ID")]
    public int NodeId { get; set; }
    public Node Node { get; set; }
    
    [Column("EDITED_AT")]
    public DateTime EditedAt { get; set; }
    
    [Column("EDIT_TYPE")]
    public EEditType EditType { get; set; }
}