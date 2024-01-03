<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10">
                <h1>Books123</h1>
                <hr><br><br>
                <div class="book-form">
                    <div class="form-group">
                        <label for="bookName">Title:</label>
                        <input type="text" id="bookName" v-model="newBook.title">
                    </div>
                    <div class="form-group">
                        <label for="bookTitle">Author:</label>
                        <input type="text" id="bookTitle" v-model="newBook.author">
                    </div>
                    <div class="form-group">
                        <label for="read">Read:</label>
                        <input type="checkbox" id="read" v-model="newBook.read">
                    </div>
                    <!-- Add a button to trigger a method when the form is submitted -->
                    <button @click="addBook()" class="btn btn-primary" :disabled="isSubmitDisabled"
                        v-if="!isEditing">Submit</button>
                    <button @click="editBook()" class="btn btn-primary" :disabled="isSubmitDisabled"
                        v-if="isEditing">Confirm Edit</button>
                </div>
                <br><br>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Read?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book, index) in books.books" :key="book.index">
                            <td>{{ book.title }}</td>
                            <td>{{ book.author }}</td>
                            <td>{{ book.read ? "Yes" : "No" }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-warning btn-sm" @click="updateBook(index)">Update</button>
                                    <button class="btn btn-danger btn-sm" @click="deleteBook(index)">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div hidden class=" d-none ">
        The flag below is maintained by setTimeout method in the created section
        {{ needsVueRefresh }}
        It is here to force the component to update when any new change occurs in the underlying data
        The vue reactive framework detects that it has changed and forces
        the component to refresh
    </div>
</template>

<script>
export default {
    props: ["books"],
    data() {
        return {
            // allBooks: [],
            newBook: { title: "", author: "", read: false },
            bookEditIndex: null,
            needsVueRefresh: { "data": false, "keepLooping": false },
            isEditing: false
        };
    },
    computed: {
        // Compute a boolean indicating whether the submit button should be disabled
        isSubmitDisabled() {
            return !this.newBook.title && !this.newBook.author;
        }
    },
    methods: {
        updateBook(index) {
            this.newBook.title = this.books.books[index].title
            this.newBook.author = this.books.books[index].author
            this.newBook.read = this.books.books[index].read
            this.bookEditIndex = index
            this.isEditing = true
        },
        editBook() {
            this.books.editBook(this.newBook.title, this.newBook.author, this.newBook.read, this.bookEditIndex)
            this.newBook.title = ""
            this.newBook.author = ""
            this.newBook.read = ""
            this.bookEditIndex = null
            this.isEditing = false
        },
        deleteBook(index) {
            this.books.deleteBook(index)
        },
        addBook() {
            this.books.addBook(this.newBook)
            this.newBook.title = ""
            this.newBook.author = ""
            this.newBook.read = ""
        },
        vueRefresh() {

            let data = ""
            data = data + this.books.books.length

            this.needsVueRefresh.data = data

            if (this.needsVueRefresh.keepLooping) {
                const myTimeout = setTimeout(this.vueRefresh, 500);
            }
        },
    },
    created() {
        this.needsVueRefresh.keepLooping = true;
        this.vueRefresh();
    },
    beforeUnmount() {
        this.needsVueRefresh.keepLooping = false
    },
};
</script>

<style scoped>
label {
    display: block;
    margin-bottom: 5px;
}

button {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
}
</style>