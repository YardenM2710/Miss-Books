import { booksService } from '../services/book-service.js'
import bookList from './book-list.cmp.js'
import bookDetails from '../pages/book-details.cmp.js'
import bookFilter from './book-filter.cmp.js'
import { utilService } from '../services/util-service.js'

export default {
  template: `
    <section class="book-app">
      <book-filter @filtered="setFilter"/>
      <book-list  :books="booksToShow" @removeBook="removeBook"/>
      <book-details />
    </section>
    `,
  data() {
    return {
      books: null,
      filterBy: null,
    }
  },
  created() {
    this.getBooks()
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books
      const searchStr = this.filterBy.title.toLowerCase()
      const fromPrice = this.filterBy.fromPrice
      const toPrice = this.filterBy.toPrice
      return this.books
        .filter(book => {
          return book.title.toLowerCase().includes(searchStr)
        })
        .filter(book => {
          if (+fromPrice === 0 && +toPrice === 0) return true
          return (
            book.listPrice.amount > fromPrice && book.listPrice.amount < toPrice
          )
        })
    },
  },
  methods: {
    getBooks() {
      booksService.query().then(books => (this.books = books))
    },
    removeBook(id) {
      booksService.remove(id).then(() => this.getBooks())
    },
    removePreview(name) {
      booksService.removePrev(name).then(() => this.getBooks())
    },

    setFilter(filterBy) {
      this.filterBy = filterBy
    },
  },
  components: {
    bookList,
    bookDetails,
    bookFilter,
  },
}
