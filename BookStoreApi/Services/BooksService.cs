using BookStoreApi.Models;
using BookStoreApi.Repository;

namespace BookStoreApi.Services
{
    public class BooksService : IBooksService
    {
        private readonly IBookRepository _bookRepository;

        public BooksService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public Task<List<Book>> GetAsync()
        {
            return _bookRepository.GetAsync();
        }

        public Task<Book> GetByIdAsync(string id)
        {
            return _bookRepository.GetByIdAsync(id);
        }

        public Task<Book> CreateAsync(Book newBook)
        {
            return _bookRepository.CreateAsync(newBook);
        }

        public Task UpdateAsync(string id, Book updatedBook)
        {
            return _bookRepository.UpdateAsync(id, updatedBook);
        }

        public Task RemoveAsync(string id)
        {
            return _bookRepository.RemoveAsync(id);
        }

        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}

