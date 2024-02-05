using BookStoreApi.Models;

namespace BookStoreApi.Services
{
    public interface IBooksService
    {
        Task<List<Book>> GetAsync();
        Task<Book> GetByIdAsync(string id);
        Task<Book> CreateAsync(Book newBook);
        Task UpdateAsync(string id, Book updatedBook);
        Task RemoveAsync(string id);
        Task DeleteAsync(string id);
        
    }
}
