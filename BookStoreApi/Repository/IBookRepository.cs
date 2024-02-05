using BookStoreApi.Models;

namespace BookStoreApi.Repository
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAsync();
        Task<Book> GetByIdAsync(string id);
        Task<Book> CreateAsync(Book book);
        Task UpdateAsync(string id, Book book);
        Task RemoveAsync(string id);
        Task DeleteAsync(string id);
    }
}
