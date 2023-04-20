namespace Domain.Repositories.Implementations;

public class CategoryNodeRepository : ARepository<CategoryNode>, ICategoryNodeRepository
{
    public CategoryNodeRepository(ModelDbContext context) : base(context)
    {
    }
}