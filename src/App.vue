<template>
  <div class="app">
    <header>
      <h1>Movie Listing App</h1>
      <nav>
        <router-link to="/" class="nav-link">Movies</router-link>
        <router-link to="/favorites" class="nav-link">Favorites</router-link>
      </nav>
    </header>
    
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import MovieList from '@/views/MovieList.vue'
import FavoritesList from '@/views/FavoritesList.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    MovieList,
    FavoritesList
  },
  setup() {
    const store = useStore()
    
    onMounted(() => {
      store.commit('initializeFavorites')
    })
  }
})
</script>
<style lang="scss">
.app {
  h1 {
    text-align: center;
    margin: 20px 0;
  }
  nav {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin: 20px 0;
    
    .nav-link {
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      color: #333;
      background: #f0f0f0;
      
      &.router-link-active {
        background: #007bff;
        color: white;
      }
    }
  }
}
</style>


