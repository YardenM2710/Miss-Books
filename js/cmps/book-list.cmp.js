import bookPreview from './book-preview.cmp.js'
import { booksService } from '../services/book-service.js'

export default {
  template: `
        <ul  class="book-list">
            <li @click="openDetails(book.id)"  v-for="book in books" :key="book.id" class="book-preview-container" >
              <img class="book-list-img" v-bind:src="book.thumbnail"/>
              <book-preview :book="book"/>
              <div class="actions">
                  <button  @click.stop="remove(book.id)" >X</button>
                  </div>
            </li>
        </ul>
  `,
  data() {
    return {
      books: null,
    }
  },
  created() {
    booksService.query().then(books => (this.books = books))
  },
  methods: {
    remove(bookId) {
      this.$emit('removeBook', bookId)
    },
    openDetails(bookId) {
      this.$router.push(`/book/${bookId}`)
    },
  },
  components: {
    bookPreview,
  },
}
