import { ref } from 'vue'
import axios from 'axios'
import { MovieApiResponse } from '@/types/movie'
import { useStore } from 'vuex'

export function useMovies() {
  const store = useStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const searchMovies = async (title: string, page: number = 1) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get<MovieApiResponse>(
        `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
      )
      
      store.commit('setSearchResults', response.data.data)
      store.commit('setTotalPages', response.data.total_pages)
      store.commit('setCurrentPage', page)
    } catch (e) {
      error.value = 'Failed to fetch movies'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    searchMovies
  }
}
