export default {
  template: `
        <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search By Name">
            <input @input="filter" v-model="filterBy.fromPrice" type="number" placeholder="From Price">
            <input @input="filter" v-model="filterBy.toPrice" type="number" placeholder="To">
        </div>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        fromPrice: '',
        toPrice: '',
      },
    }
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
