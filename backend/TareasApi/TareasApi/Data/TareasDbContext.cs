using Microsoft.EntityFrameworkCore;

public class TareasDbContext : DbContext
{
    public TareasDbContext(DbContextOptions<TareasDbContext> options) : base(options) { }

    public DbSet<Usuario> usuarios { get; set; } 
    public DbSet<Tarea> tareas { get; set; }      

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        
        modelBuilder.Entity<Tarea>()
            .HasOne(t => t.Usuario)
            .WithMany() 
            .HasForeignKey(t => t.usuario_id)
            .OnDelete(DeleteBehavior.Cascade);

        
        modelBuilder.Entity<Usuario>().ToTable("usuarios");
        modelBuilder.Entity<Tarea>().ToTable("tareas");
    }
}
