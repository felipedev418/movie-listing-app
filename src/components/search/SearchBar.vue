<template>
  <div class="search-container">
    <div class="search-bar">
      <i class="search-icon">🔍</i>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search movies..."
         @keyup.enter="handleSearch"
      >
      <button class="refresh-btn" @click="showAllMovies">
        <i class="refresh-icon">↻</i>
      </button>
    </div>
    <div v-if="loading" class="loader">
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMovies } from '@/composables/useMovies'
import { useDebounceFn } from '@vueuse/core'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const store = useStore()
    const searchQuery = ref(store.state.searchQuery)
    const { loading, searchMovies } = useMovies()

    const handleSearch = useDebounceFn(() => {
      if (searchQuery.value.length > 2) {
        store.commit('setSearchQuery', searchQuery.value)
        searchMovies(searchQuery.value)
      }
    }, 300)

    const showAllMovies = () => {
      searchQuery.value = ''
      store.commit('setSearchQuery', '')
      // Using a default search term that will return many movies
      searchMovies('movie', 1)
    }

    return {
      searchQuery,
      loading,
      handleSearch,
      showAllMovies
    }
  }
})
</script>


<style lang="scss">
.search-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;

  .search-bar {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 50px;
    padding: 0.8rem 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover, &:focus-within {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .search-icon {
      font-size: 1.2rem;
      margin-right: 0.8rem;
      color: #666;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1.1rem;
      color: #333;
      background: transparent;

      &::placeholder {
        color: #999;
      }
    }

    .refresh-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 50%;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(180deg);
      }

      .refresh-icon {
        font-size: 1.4rem;
        color: #666;
      }
    }
  }

  .loader {
    text-align: center;
    margin-top: 1rem;

    .loader-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 3px;
      border-radius: 50%;
      background-color: #666;
      animation: bounce 0.5s infinite alternate;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-8px); }
}
</style>
