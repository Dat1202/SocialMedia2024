using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.Entities;
using SocialMedia2024.WebApi.Domain.Enum;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.Infrastructure.Persistence
{

    public class SocialMedia2024DbContext : IdentityDbContext<User, IdentityRole, string>
    {
        private readonly IConfiguration _configuration;
        private readonly IServiceProvider _serviceProvider;

        public SocialMedia2024DbContext(DbContextOptions<SocialMedia2024DbContext> options, IConfiguration configuration,
            IServiceProvider serviceProvider)  : base(options)
        {
            _configuration = configuration;
            _serviceProvider = serviceProvider;
        }

        public DbSet<User> User { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<ReplyComment> ReplyComment { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<PostAction> PostAction { get; set; }
        public DbSet<PostMedia> PostMedia { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<Friend> Friend { get; set; }
        public DbSet<UserInChatGroup> UserInChatGroup { get; set; }
        public DbSet<ChatGroup> ChatGroup { get; set; }
        public DbSet<TLMenu> Menu { get; set; }
        public DbSet<SystemError> SystemError { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedData(modelBuilder);

            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<IdentityRole>().ToTable("Role");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRole");

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email)
                .IsUnique();

                entity.HasIndex(u => new { u.Email, u.PasswordHash });
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasOne(u => u.User)
               .WithMany(c => c.Comments)
               .HasForeignKey(u => u.UserId)
               .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(p => p.Post)
                .WithMany(c => c.Comments)
                .HasForeignKey(p => p.PostID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(p => p.CreateAt);
            });

            modelBuilder.Entity<Friend>(entity =>
            {
                entity.HasKey(ui => new { ui.UserFollowerID, ui.UserFollowingID });

                entity.HasOne(u => u.UserFollower)
                .WithMany(f => f.UserFollowers) // Mối quan hệ nhiều-nhiều với UserFollowers
                .HasForeignKey(f => f.UserFollowerID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(u => u.UserFollowing)
                .WithMany(f => f.UserFollowings) // Mối quan hệ nhiều-nhiều với UserFollowings
                .HasForeignKey(f => f.UserFollowingID)
                .OnDelete(DeleteBehavior.NoAction);

                entity.Property(p => p.Status)
                .HasConversion(v => (int)v, v => (Status)v);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasOne(u => u.User)
                .WithMany(p => p.Posts)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.Property(p => p.MediaType)
                .HasConversion(v => (int)v, v => (MediaType)v);// Chuyển đổi enum thành int khi lưu
            });

            modelBuilder.Entity<PostAction>(entity =>
            {
                entity.HasOne(u => u.User)
               .WithMany(c => c.PostActions)
               .HasForeignKey(u => u.UserID)
               .OnDelete(DeleteBehavior.NoAction);

                entity.HasKey(k => new { k.UserID, k.PostID });
            });


            modelBuilder.Entity<PostMedia>(entity =>
            {
                entity.HasOne(p => p.Post)
                   .WithMany(c => c.PostMedias)
                   .HasForeignKey(u => u.PostID)
                   .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasOne(p => p.Post)
                .WithMany(c => c.Notifications)
                .HasForeignKey(u => u.PostID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(p => p.User)
                .WithMany(c => c.Notifications)
                .HasForeignKey(u => u.UserID)
                .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<UserInChatGroup>(entity =>
            {
                entity.HasKey(k => new
                { 
                    k.UserID, k.ChatGroupID
                });

                entity.HasOne(u => u.User)
                .WithMany(p => p.UserInChatGroups)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(p => p.ChatGroup)
               .WithMany(c => c.UserInChatGroups)
               .HasForeignKey(u => u.ChatGroupID)
               .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ReplyComment>(entity =>
            {
                entity.HasOne(u => u.Comment)
                .WithMany(p => p.ReplyComments)
                .HasForeignKey(p => p.CommentParentID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(p => p.User)
               .WithMany(c => c.ReplyComments)
               .HasForeignKey(u => u.UserID)
               .OnDelete(DeleteBehavior.NoAction);
            });
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            string defaultAdmin = "Admin";
            var passwordHashService = _serviceProvider.CreateScope().ServiceProvider.GetService<PasswordHasher<User>>();
            string userId = Guid.NewGuid().ToString();
            string roleId = string.Empty;
            var roles = _configuration.GetSection("DefaultRole");

            if (roles.Exists())
            {
                foreach (var role in roles.GetChildren())
                {
                    string id = Guid.NewGuid().ToString();

                    modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
                    {
                        Id = id,
                        Name = role.Value,
                        NormalizedName = role.Value.ToUpper()
                    });

                    if (role.Value == defaultAdmin)
                    {
                        roleId = id;
                    }
                }
            }

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = userId,
                    UserName = defaultAdmin.ToLower(),
                    NormalizedUserName = defaultAdmin.ToUpper(),
                    Email = "admin@gmail.com".ToUpper(),
                    NormalizedEmail = "admin@gmail.com".ToUpper(),
                    AccessFailedCount = 0,
                    FirstName = defaultAdmin,
                    LastName = "",
                    PasswordHash = passwordHashService.HashPassword(new Domain.Entities.User
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = defaultAdmin,
                        NormalizedUserName = defaultAdmin.ToUpper(),
                        Email = "admin@gmail.com".ToUpper(),
                    }, "Admin@123")
                });

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = roleId,
                UserId = userId,

            });
        }
    }
}