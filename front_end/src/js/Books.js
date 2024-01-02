class Books {
  constructor () {
    this.books = []
    this.getBooksFromAPI()
  }

  getBooksFromAPI () {
    const url = 'http://localhost:5000/api_get_books'
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer my-token',
      }
    }

    // Returning the fetch promise
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(response_package => {
        if (response_package.rc === 0) {
          this.books = response_package.books
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Fetch error:', error)
        // Re-throw the error to propagate it to the calling code
        throw error
      })
  }

  getBooks () {
    return this.books
  }

  addBook (newBook) {
    const url = 'http://localhost:5000/api_add_book'
    const data = {}
    data.title = newBook.title
    data.author = newBook.author
    data.read = newBook.read

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify(data)
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(apiObject => {
        if (apiObject.rc == 0) {
          console.log('success')
          this.books.push(data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteBook (index) {
    const url = 'http://localhost:5000/api_delete_book'
    const data = {}
    data.index = index

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify(data)
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(apiObject => {
        if (apiObject.rc == 0) {
          console.log('success removing book')
          this.books.splice(index, 1)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  editBook (title, author, read, index) {
    const url = 'http://localhost:5000/api_edit_book'
    const data = {}
    data.title = title
    data.author = author
    data.read = read
    data.index = index

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify(data)
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(apiObject => {
        if (apiObject.rc == 0) {
          console.log('success editing book')
          this.books[index].title = title
          this.books[index].author = author
          this.books[index].read = read
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default Books
