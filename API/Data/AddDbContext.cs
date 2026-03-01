using System;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
       public DbSet<AppUser> Users { get; set; }
    }

