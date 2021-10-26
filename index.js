class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}


class ui {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'book two',
                author: 'john doe',
                isbn: '343343',

            },
            {
                title: 'book two',
                author: 'jane doe',
                isbn: '455545',
            }

        ];
        const books = StoredBooks;
        books.forEach((book) => ui.addBookToList(book));

    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
         `;
        list.appendChild(row);

    }
    static showalert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // make vanish in 3sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static deleteook(el) {
        if (el.classList.contais('delete')) {
            el.parentElement.parentELement.remove();
        }
    }

}
class Store {
    static getbooks() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }


    }
    static addbook(book) {
        const books = Store.getbooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getbooks();

        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                book.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }



}
//Display books
document.addEventListener('DOMContentLoaded', ui.displayBooks);

document.querySelector("#book-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title == '' || author == '' || isbn == '') {
        ui.showalert('please fill in all fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);
        ui.addBookToList(book);
        // clear field
        ui.showalert('book added', 'success');
        ui.clearfields();
    }
});

document.querySelector('#ook-List').addEventListener('click', (e) => {
    ui.deleteBook(e.target)
});



