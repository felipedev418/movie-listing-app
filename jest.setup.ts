import { config } from '@vue/test-utils'
import { createStore } from 'vuex'

// Create a mock store for testing
const store = createStore({
  state: {
    searchResults: [],
    favorites: [],
    currentPage: 1,
    totalPages: 1,
    searchQuery: ''
  },
  mutations: {
    setSearchResults: (state, results) => state.searchResults = results,
    setTotalPages: (state, total) => state.totalPages = total,
    setCurrentPage: (state, page) => state.currentPage = page,
    setSearchQuery: (state, query) => state.searchQuery = query
  }
})

// Configure global plugins
config.global.plugins = [store]
