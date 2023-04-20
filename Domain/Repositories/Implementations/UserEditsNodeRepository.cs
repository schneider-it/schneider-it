namespace Domain.Repositories.Implementations;

public class UserEditsNodeRepository : ARepository<UserEditsNode>, IUserEditsNodeRepository
{
    public UserEditsNodeRepository(ModelDbContext context) : base(context)
    {
    }
}