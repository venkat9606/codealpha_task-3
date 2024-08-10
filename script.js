// Book Library Application

document.getElementById('book-form').addEventListener('submit', addBook);
document.getElementById('search').addEventListener('input', searchBooks);

let books = [];

function addBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const category = document.getElementById('category').value;

    const book = {
        title,
        author,
        isbn,
        category,
        borrowed: false
    };

    books.push(book);
    displayBooks();
    clearForm();
}

function displayBooks(filter = '') {
    const tableBody = document.querySelector('#book-table tbody');
    tableBody.innerHTML = '';

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.category.toLowerCase().includes(filter.toLowerCase())
    );

    filteredBooks.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.category}</td>
            <td>${book.borrowed ? 'Yes' : 'No'}</td>
            <td class="actions">
                <button onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
                <button onclick="removeBook(${index})">Remove</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('category').value = '';
}

function searchBooks(e) {
    const searchTerm = e.target.value;
    displayBooks(searchTerm);
}

function borrowBook(index) {
    books[index].borrowed = !books[index].borrowed;
    displayBooks();
}

function removeBook(index) {
    books.splice(index, 1);
    displayBooks();
}

// Initial display of books (empty at the start)
displayBooks();
