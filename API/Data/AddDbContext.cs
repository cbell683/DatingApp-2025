using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
       public DbSet<AppUser> Users { get; set; }

       public DbSet<Member> Members { get; set; }

       public DbSet<Photo> Photos { get; set; }


   
// CB commented the below 04072026
 protected override void OnModelCreating(ModelBuilder modelBuilder)
{    
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Member>()
        .HasOne(m => m.User)
        .WithOne(u => u.Member)
        .HasForeignKey<Member>(m => m.AppUserId)
        .OnDelete(DeleteBehavior.Cascade);

    var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
        v => v.ToUniversalTime(),
        v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
    );

    foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
}

}