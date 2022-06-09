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
    public static async Task SyncWithDatabase<TParent, TChild, TKey>(this DbContext db, TParent parent, Expression<Func<TParent, IEnumerable<TChild>>> itemSelector, Func<TChild, TKey> getKey, bool performUpdate = false)
        where TParent : class, IEntity
    {
        IEnumerable<TChild> newItems = itemSelector.Compile().Invoke(parent);
        if (newItems != null)
        {
            db.ChangeTracker.AutoDetectChangesEnabled = false;
            
            List<TChild> currentItems = await db.Set<TParent>().AsNoTracking().Where(e => e.Id == parent.Id).SelectMany(itemSelector).ToListAsync();
            IEnumerable<TChild> newItemsList = newItems.ToList();
            foreach (TChild entity in currentItems.Except(newItemsList, getKey))
            {
                db.Entry(entity).State = EntityState.Deleted;
            }
            foreach (TChild entity in newItemsList.Except(currentItems, getKey))
            {
                db.Entry(entity).State = EntityState.Added;
            }
			if (performUpdate)
			{
				foreach (TChild entity in newItemsList.Where(e => db.Entry(e).State == EntityState.Detached))
				{
					db.Entry(entity).State = EntityState.Modified;
				}
			}
			db.ChangeTracker.DetectChanges();
            db.ChangeTracker.AutoDetectChangesEnabled = true;
        }
    }
    
    private static IEnumerable<T> Except<T, TKey>(this IEnumerable<T> items, IEnumerable<T> other, Func<T, TKey> getKeyFunc)
    {
        return items
            .GroupJoin(other, getKeyFunc, getKeyFunc, (item, tempItems) => new { item, tempItems })
            .SelectMany(t => t.tempItems.DefaultIfEmpty(), (t, temp) => new { t, temp })
            .Where(t => t.temp == null || t.temp.Equals(default(T)))
            .Select(t => t.t.item);
    }
}