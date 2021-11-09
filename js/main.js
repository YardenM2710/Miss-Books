import bookApp from './cmps/book-app.cmp.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import { router } from './routes.js'

const options = {
  el: '#app',
  router: router,
  template: ` 
  <section>
    <app-header/>
    <user-msg/>
    <router-view/>
  <!-- <book-app/> -->
  <app-footer/>
  </section>
  `,
  components: {
    bookApp,
    appHeader,
    appFooter,
    userMsg,
  },
}

new Vue(options)
