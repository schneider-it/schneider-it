namespace Domain.Repositories.Implementations;

public class NodeRepository : ARepository<Node>, INodeRepository
{
    public NodeRepository(ModelDbContext context) : base(context)
    {
    }
}