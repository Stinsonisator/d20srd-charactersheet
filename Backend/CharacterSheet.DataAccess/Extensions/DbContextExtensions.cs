using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CharacterSheet.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CharacterSheet.DataAccess.Extensions;

public static class DbContextExtensions
{
    public static async Task AddOrRemoveDifference<TParent, TChild, TKey>(this DbContext db, TParent parent, Expression<Func<TParent, IEnumerable<TChild>>> itemSelector, Func<TChild, TKey> getKey)
        where TParent : class, IEntity
    {
        IEnumerable<TChild> newItems = itemSelector.Compile().Invoke(parent);
        if (newItems != null)
        {
            db.ChangeTracker.AutoDetectChangesEnabled = false;
            
            List<TChild> currentItems = await db.Set<TParent>().AsNoTracking().Where(e => e.Id == parent.Id).SelectMany(itemSelector).ToListAsync();
            IEnumerable<TChild> newItemsList = newItems.ToList();
            foreach (TChild entity in currentItems.ExceptCustom(newItemsList, getKey))
            {
                db.Entry(entity).State = EntityState.Deleted;
            }
            foreach (TChild entity in newItemsList.ExceptCustom(currentItems, getKey))
            {
                db.Entry(entity).State = EntityState.Added;
            }
            db.ChangeTracker.DetectChanges();
            db.ChangeTracker.AutoDetectChangesEnabled = true;
        }
    }
    
    public static async Task AddUpdateOrDelete<TEntity>(this DbContext db, IEnumerable<TEntity> newItems, Expression<Func<TEntity, bool>> predicate)
        where TEntity : class, IEntity
    {
        if (newItems != null)
        {
            db.ChangeTracker.AutoDetectChangesEnabled = false;
            List<TEntity> currentItems = await db.Set<TEntity>()
                .AsNoTracking()
                .Where(predicate)
                .ToListAsync().ConfigureAwait(false);

            IEnumerable<TEntity> newItemsList = newItems.ToList();
            foreach (TEntity entity in currentItems.ExceptCustom(newItemsList, e => e.Id))
            {
                db.Entry(entity).State = EntityState.Deleted;
            }

            foreach (TEntity entity in newItemsList.ExceptCustom(currentItems, e => e.Id))
            {
                db.Entry(entity).State = EntityState.Added;
            }

            foreach (TEntity entity in newItemsList.Where(e => e.Id > 0 && db.Entry(e).State == EntityState.Detached))
            {
                db.Entry(entity).State = EntityState.Modified;
            }

            db.ChangeTracker.DetectChanges();
            db.ChangeTracker.AutoDetectChangesEnabled = true;
        }
    }
    
    public static IEnumerable<T> ExceptCustom<T, TKey>(this IEnumerable<T> items, IEnumerable<T> other, Func<T, TKey> getKeyFunc)
    {
        return items
            .GroupJoin(other, getKeyFunc, getKeyFunc, (item, tempItems) => new { item, tempItems })
            .SelectMany(t => t.tempItems.DefaultIfEmpty(), (t, temp) => new { t, temp })
            .Where(t => t.temp == null || t.temp.Equals(default(T)))
            .Select(t => t.t.item);
    }
}