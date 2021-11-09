import { booksService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'
export default {
  props: ['bookId'],
  template: `
    <section>
        <button v-if="!isFormOn" @click="isFormOn = true">Add Review</button>
        <form v-else class="add-review">
            <button class="close-btn" @click="isFormOn = !isFormOn"></button>
            <label>Full name:</label>
            <input v-model="reviewToAdd.name" type="text">
            <label>Rate:</label>
            <input v-model="reviewToAdd.rate" type="number" min="0" max="5">
            <input v-model="reviewToAdd.date" type="date">
            <textarea v-model="reviewToAdd.freeTxt" rows="4" cols="50">
            </textarea>
            <button  @click="add">Submit</button>
        </form>
    </section>
      `,
  data() {
    return {
      //   reviews: [],
      reviewToAdd: {
        name: null,
        rate: null,
        date: null,
        freeTxt: null,
      },
      isFormOn: false,
      //   reviewSent: true,
    }
  },
  created() {},
  methods: {
    add() {
      booksService
        .addReview(this.reviewToAdd, this.bookId)
        .then(updatedBook => {
          this.reviewToAdd = {
            name: null,
            rate: null,
            date: null,
            freeTxt: null,
          }
          setTimeout(() => {
            this.isFormOn = false
          }, 1)
          this.$emit('reviewAdded')
          const msg = {
            txt: `review for ${this.bookId} added succesfully`,
            type: 'succes',
            link: '/book/' + this.bookId,
          }
          eventBus.$emit('showMsg', msg)
        })
        .catch(err => {
          const msg = {
            txt: 'Error,Please try again',
            type: 'error',
          }
        })
    },
  },
}
