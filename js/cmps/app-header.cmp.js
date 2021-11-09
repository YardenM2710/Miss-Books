export default {
  template: `
        <header class="app-header">
            <div class="logo">
                <h1>Mister Books</h1>
            </div>
            <nav>
                <router-link active-class="active" to='/'>Home</router-link>
                <router-link  active-class="active" to='/about'>About</router-link>
                <router-link  active-class="active" to='/book'>Books</router-link>
            </nav>


        </header>
    `,
}
