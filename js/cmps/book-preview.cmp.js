export default {
  props: ['book'],
  template: `
        <div class="book-preview">
            <p><span>Title</span> : {{book.title}}</p>
            <p><span>Price:</span> {{book.listPrice.amount}}{{currencyStrToSymbol}}</p>
            
            

        </div>
    `,
  data() {
    return {}
  },
  computed: {
    currencyStrToSymbol(ev) {
      let currencyStr = ev.book.listPrice.currencyCode
      if (currencyStr === 'USD') return '$'
      if (currencyStr === 'EUR') return '£'
      if (currencyStr === 'ILS') return '₪'
    },
  },
}
