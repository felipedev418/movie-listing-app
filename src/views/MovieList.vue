<template>
  <div class="movie-list-view">
    <SearchBar />
    <MovieGrid :movies="movies" />
    <Pagination 
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useMovies } from "@/composables/useMovies";
import SearchBar from '@/components/search/SearchBar.vue'
import MovieGrid from "@/components/movies/MovieGrid.vue";
import Pagination from "@/components/navigation/Pagination.vue";

export default defineComponent({
  name: "MovieList",
  components: {
    SearchBar,
    MovieGrid,
    Pagination,
  },
  setup() {
    const store = useStore();
    const { searchMovies } = useMovies();

    onMounted(() => {
      // This will load all movies on initial mount
      searchMovies("movie", 1);
    });

    const movies = computed(() => store.state.searchResults);
    const currentPage = computed(() => store.state.currentPage);
    const totalPages = computed(() => store.state.totalPages);

    const handlePageChange = (page: number) => {
      const query = store.state.searchQuery || "movie";
      searchMovies(query, page);
    };

    return {
      movies,
      currentPage,
      totalPages,
      handlePageChange,
    };
  },
});
</script>

