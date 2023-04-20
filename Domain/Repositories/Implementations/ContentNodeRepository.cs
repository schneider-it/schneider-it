namespace Domain.Repositories.Implementations;

public class ContentNodeRepository : ARepository<ContentNode>, IContentNodeRepository
{
    public ContentNodeRepository(ModelDbContext context) : base(context)
    {
    }
}