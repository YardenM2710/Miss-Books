export default {
  props: ['book'],
  template: `
  <section>
      <p>Description: {{getShorterTxt}} <a @click="showLongText = !showLongText" class="show-more-btn">{{buttonTxt}}</a></p>

      
</section>
              
      `,
  data() {
    return {
      showLongText: false,
    }
  },
  computed: {
    getShorterTxt() {
      if (this.book.description.length > 100) {
        if (this.showLongText) return this.book.description
        let ShorterStr = this.book.description.substring(0, 100)
        return ShorterStr
      } else return this.book.description
    },
    // getLongerTxt() {
    //   return this.book.description
    // },
    buttonTxt() {
      if (this.showLongText) return 'show less'
      return 'show more'
    },
  },
}
