using Microsoft.EntityFrameworkCore;
using WebAPI.Entity;

namespace WebAPI
{
    public class AppDbContext : DbContext
    {
        public DbSet<Member> Member { get; set; }
        public DbSet<Payment> Payment { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>();
            modelBuilder.Entity<Payment>();

        }
    }
}
