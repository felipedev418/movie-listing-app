import { createRouter, createWebHistory } from 'vue-router'
import MovieListView from '@/views/MovieList.vue'
import FavoritesView from '@/views/FavoritesList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MovieListView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    }
  ]
})

export default router
