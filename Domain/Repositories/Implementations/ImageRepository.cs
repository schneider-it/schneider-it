namespace Domain.Repositories.Implementations;

public class ImageRepository : ARepository<Image>, IImageRepository
{
    public ImageRepository(ModelDbContext context) : base(context)
    {
    }
}