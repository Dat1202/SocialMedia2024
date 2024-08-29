using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SocialMedia2024.Domain.Entities;
using SocialMedia2024.WebApi.Domain.Entities;
using SocialMedia2024.WebApi.Domain.Enum;
using SocialMedia2024.WebApi.Domain.SystemEntities;

namespace SocialMedia2024.Infrastructure.Persistence
{

    public class SocialMedia2024DbContext : IdentityDbContext<User, IdentityRole, string>
    {
        public SocialMedia2024DbContext(DbContextOptions<SocialMedia2024DbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ReplyComment> ReplyComments { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostAction> PostActions { get; set; }
        public DbSet<PostMedia> PostMedias { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<UserInChatGroup> UserInChatGroups { get; set; }
        public DbSet<ChatGroup> ChatGroups { get; set; }
        public DbSet<TLMenu> TLMenus { get; set; }
        public DbSet<SystemError> SystemErrors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email)
                .IsUnique();
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
    }
}