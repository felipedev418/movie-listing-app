<template>
  <div class="movie-card">
    <div class="content">
      <h3 class="title">{{ movie.Title }}</h3>
      <p class="year">{{ movie.Year }}</p>
      <p class="imdb">{{ movie.imdbID }}</p>
      <button 
        @click="toggleFavorite"
        :class="{ 'is-favorite': isFavorite }"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import type { Movie } from '@/types/movie'

export default defineComponent({
  name: 'MovieCard',
  props: {
    movie: {
      type: Object as () => Movie,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const isFavorite = computed(() => store.getters.isFavorite(props.movie))
    const toggleFavorite = () => {
      store.commit('toggleFavorite', props.movie)
    }
    return { isFavorite, toggleFavorite }
  }
})
</script>

<style lang="scss">
.movie-card {
  background: white;
  border-radius: 12px;
  height: 250px; /* Fixed height */
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .content {
    text-align: center;

    .title {
      font-size: 1.4rem;
      margin: 0 0 12px;
      color: #2c3e50;
      font-weight: 600;
    }

    .year {
      font-size: 1.1rem;
      color: #34495e;
      margin: 8px 0;
    }

    .imdb {
      font-size: 0.9rem;
      color: #7f8c8d;
      font-family: monospace;
      margin: 8px 0;
    }

    button {
      position: absolute;
      top: -15px;
      right: 15px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.6rem;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.1);
      }

      &.is-favorite {
        color: #ffd700;
        animation: pulse 0.3s ease;
      }
    }
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
