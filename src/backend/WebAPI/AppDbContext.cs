using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI
{
    public class AppDbContext:DbContext
    {
        public DbSet<Member> Members { get; set; }
        public DbSet<Payment> Payments { get; set; }

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
