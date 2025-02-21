<template>
  <div class="favorites-view">
    <h2>My Favorites</h2>
    <div v-if="paginatedFavorites.length" class="movies-grid">
      <MovieGrid :movies="paginatedFavorites" />
    </div>
    <div v-else class="empty-state">No favorite movies yet</div>

    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import MovieGrid from "@/components/movies/MovieGrid.vue";
import Pagination from "@/components/navigation/Pagination.vue";

export default defineComponent({
  name: "FavoritesView",
  components: {
    MovieGrid,
    Pagination,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const favorites = computed(() => store.state.favorites);
    const totalPages = computed(() =>
      Math.ceil(favorites.value.length / itemsPerPage)
    );

    const paginatedFavorites = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return favorites.value.slice(start, end);
    });

    const handlePageChange = (page: number) => {
      currentPage.value = page;
    };

    return {
      paginatedFavorites,
      currentPage,
      totalPages,
      handlePageChange,
    };
  },
});
</script>

<style lang="scss">
.favorites-view {
  h2 {
    text-align: center;
    margin: 20px 0;
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
}
</style>
