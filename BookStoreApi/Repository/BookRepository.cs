using BookStoreApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookStoreApi.Repository
{
    public class BookRepository: IBookRepository
    {
        private readonly IMongoCollection<Book> _booksCollection;
        private readonly BookStoreDatabaseSettings _databaseSettings;

        public BookRepository(
            IOptions<BookStoreDatabaseSettings> bookStoreDatabaseSettings)
        {
            _databaseSettings = bookStoreDatabaseSettings.Value;

            var mongoClient = new MongoClient(_databaseSettings.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(_databaseSettings.DatabaseName);

            _booksCollection = mongoDatabase.GetCollection<Book>(_databaseSettings.BooksCollectionName);
        }

        public Task<List<Book>> GetAsync()
        {
            return _booksCollection.Find(_ => true).ToListAsync();
        }
            

        public Task<Book> GetByIdAsync(string id)
        {
            return _booksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }
            
        public async Task<Book> CreateAsync(Book newBook)
        {
            await _booksCollection.InsertOneAsync(newBook).ConfigureAwait(false);
            return newBook;
        }
            

        public Task UpdateAsync(string id, Book updatedBook)
        {
            return _booksCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);
        }
            
        public Task RemoveAsync(string id)
        {
            return _booksCollection.DeleteOneAsync(x => x.Id == id);
        }
            
        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}
