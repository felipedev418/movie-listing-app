import { createStore } from 'vuex'
import { Movie } from '@/types/movie'

interface State {
  favorites: Movie[]
  searchResults: Movie[]
  currentPage: number
  totalPages: number
  searchQuery: string
}

export default createStore<State>({
  state: {
    favorites: [],
    searchResults: [],
    currentPage: 1,
    totalPages: 1,
    searchQuery: '' // Default search term
  },
  mutations: {
    setSearchResults(state, movies: Movie[]) {
      state.searchResults = movies
    },
    setCurrentPage(state, page: number) {
      state.currentPage = page
    },
    setTotalPages(state, total: number) {
      state.totalPages = total
    },
    setSearchQuery(state, query: string) {
      state.searchQuery = query
    },
    toggleFavorite(state, movie: Movie) {
      const index = state.favorites.findIndex(m => m.imdbID === movie.imdbID)
      if (index === -1) {
        state.favorites.push(movie)
      } else {
        state.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    initializeFavorites(state) {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        state.favorites = JSON.parse(stored)
      }
    }
  },
  getters: {
    isFavorite: (state) => (movie: Movie) => {
      return state.favorites.some(m => m.imdbID === movie.imdbID)
    }
  }
})
