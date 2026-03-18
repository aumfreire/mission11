using mission11.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private BookstoreContext _context;

        public BookStoreController(BookstoreContext temp) => _context = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string? sortBy = null, string sortDir = "asc")
        {
            var query = _context.Books.AsQueryable();

            //Only sort when user explicitly asks for title sorting
            if (!string.IsNullOrWhiteSpace(sortBy) && sortBy.Equals("title", StringComparison.OrdinalIgnoreCase))
            {
                query = sortDir.Equals("desc", StringComparison.OrdinalIgnoreCase) ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            }

            var totalNumBooks = query.Count();


            var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

            

            var bookObject = new
            {
                Books = books,
                totalNumBooks = totalNumBooks
            };

            return Ok(bookObject);
        }

    }
}