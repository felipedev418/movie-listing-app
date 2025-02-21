<template>
  <div class="movie-grid">
    <MovieCard 
      v-for="movie in movies" 
      :key="movie.imdbID" 
      :movie="movie"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MovieCard from '@/components/movies/MovieCard.vue'
import type { Movie } from '@/types/movie'

export default defineComponent({
  name: 'MovieGrid',
  components: { MovieCard },
  props: {
    movies: {
      type: Array as () => Movie[],
      required: true
    }
  }
})
</script>

<style lang="scss">
.movie-grid {
  display: grid;
  gap: 24px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1400px;
  
  /* Large desktop: 2x5 grid */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  
  /* Medium desktop/tablet landscape */
  @media (min-width: 992px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
  
  /* Tablet portrait */
  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  /* Mobile landscape */
  @media (min-width: 576px) and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
  
  /* Mobile portrait */
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
}
</style>
