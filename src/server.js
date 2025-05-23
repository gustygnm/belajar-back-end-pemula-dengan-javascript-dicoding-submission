const http = require('http');
const { nanoid } = require('nanoid');

const books = [];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const { method } = req;

  // POST /books
  if (pathname === '/books' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const data = JSON.parse(body);
      const {
        name, year, author, summary,
        publisher, pageCount, readPage, reading
      } = data;

      if (!name) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }));
      }

      if (readPage > pageCount) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }));
      }

      const id = nanoid(16);
      const insertedAt = new Date().toISOString();
      const updatedAt = insertedAt;
      const finished = pageCount === readPage;

      const newBook = {
        id, name, year, author, summary,
        publisher, pageCount, readPage, finished,
        reading, insertedAt, updatedAt,
      };

      books.push(newBook);

      res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      }));
    });
  }

  // GET /books (with optional filters)
  else if (pathname === '/books' && method === 'GET') {
    const name = parsedUrl.searchParams.get('name');
    const reading = parsedUrl.searchParams.get('reading');
    const finished = parsedUrl.searchParams.get('finished');

    let filteredBooks = books;

    if (name !== null) {
      filteredBooks = filteredBooks.filter((b) =>
        b.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (reading !== null) {
      filteredBooks = filteredBooks.filter((b) =>
        b.reading === (reading === '1')
      );
    }

    if (finished !== null) {
      filteredBooks = filteredBooks.filter((b) =>
        b.finished === (finished === '1')
      );
    }

    const responseBooks = filteredBooks.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'success',
      data: {
        books: responseBooks,
      },
    }));
  }

  // GET /books/{bookId}
  else if (pathname.startsWith('/books/') && method === 'GET') {
    const id = pathname.split('/')[2];
    const book = books.find((b) => b.id === id);

    if (!book) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'success',
      data: {
        book,
      },
    }));
  }

  // PUT /books/{bookId}
  else if (pathname.startsWith('/books/') && method === 'PUT') {
    const id = pathname.split('/')[2];
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const data = JSON.parse(body);
      const {
        name, year, author, summary,
        publisher, pageCount, readPage, reading
      } = data;

      if (!name) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }));
      }

      if (readPage > pageCount) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }));
      }

      const index = books.findIndex((b) => b.id === id);
      if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }));
      }

      const updatedAt = new Date().toISOString();
      const finished = pageCount === readPage;

      books[index] = {
        ...books[index],
        name, year, author, summary,
        publisher, pageCount, readPage,
        reading, finished, updatedAt,
      };

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      }));
    });
  }

  // DELETE /books/{bookId}
  else if (pathname.startsWith('/books/') && method === 'DELETE') {
    const id = pathname.split('/')[2];
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      }));
    }

    books.splice(index, 1);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }));
  }

  // Route not found
  else {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Halaman tidak ditemukan',
    }));
  }
});

server.listen(9000, () => {
  console.log('Server running at http://localhost:9000');
});
