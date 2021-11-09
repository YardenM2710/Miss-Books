import { booksService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'

import reviewAdd from '../cmps/review-add.cmp.js'
import longText from '../cmps/long-text.cmp.js'
export default {
  template: `
        <section v-if="book" class="book-details">
            <h3>Book Details:</h3>
            <p>Title : {{book.title}}</p>
            <img v-bind:src="book.thumbnail"/>
            <p class="heartbeat " v-if="book.listPrice.isOnSale">{{isOnSale}}</p>
            <ul class="review-list"  v-for="review in book.reviews" >
            <button @click="removeReview(review)" >X</button>
              <li>Review By: {{review.name}}</li>
              <li>Rate: {{review.rate}}</li>
              <li>Date: {{review.date}}</li>
              <li>Some about the book: {{review.freeTxt}}</li>
            </ul>
            <p>Price: <span v-bind:class="classByPrice">{{book.listPrice.amount}}</span>&nbsp; {{currencyStrToSymbol}}</p>
            <p>language: {{book.language}}</p>
            <p>categories: {{book.categories[0]}},{{book.categories[1]}}</p>
            <long-text :book='book'/>
            <p>Page Count: {{pageCount}}</p>
            <p>published At: {{publishedDate}}</p>  
            <review-add @reviewAdded="getBook" :bookId="book.id" @close="isReviewAddOn = false"/>

        </section>
    `,
  data() {
    return {
      book: null,
      bookId: this.$route.params.bookId,
      // isReviewAddOn: false,
    }
  },
  created() {
    this.getBook()
  },
  methods: {
    getBook() {
      booksService.getById(this.bookId).then(book => (this.book = book))
    },
  },
  computed: {
    pageCount() {
      if (this.book.pageCount > 500) return 'Long Reading'
      else if (this.book.pageCount > 200) return 'Decent Reading'
      else if (this.book.pageCount > 100) return 'Light Reading'
    },
    publishedDate() {
      const todayYear = new Date().getFullYear()
      if (todayYear - this.book.publishedDate > 10)
        return this.book.publishedDate + ' Veteran Book'
      if (todayYear - this.book.publishedDate < 1)
        return this.book.publishedDate + ' New Book'
      return this.book.publishedDate
    },
    classByPrice() {
      if (this.book.listPrice.amount > 150) return 'expensive'
      else if (this.book.listPrice.amount < 20) return 'cheap'
    },
    currencyStrToSymbol(ev) {
      let currencyStr = ev.book.listPrice.currencyCode
      if (currencyStr === 'USD') return '$'
      if (currencyStr === 'EUR') return '£'
      if (currencyStr === 'ILS') return '₪'
    },
    isOnSale() {
      if (this.book.listPrice.isOnSale) return 'ON SALE'
    },
    removeReview(idx) {
      this.book.reviews.splice(idx, 1)
      booksService
        .save(this.book)
        .then(() => {
          const msg = {
            txt: `Review was removed`,
            type: 'succes',
          }
          eventBus.$emit('showMsg', msg)
        })
        .catch(err => {
          console.log('err', err)
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          }
          eventBus.$emit('showMsg', msg)
        })
    },
  },
  components: {
    longText,
    reviewAdd,
  },
}
