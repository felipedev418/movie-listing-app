<template>
  <div class="pagination">
    <button 
      @click="handlePrevious" 
      :disabled="currentPage === 1"
    >
      Previous
    </button>
    
    <div class="pages">
      <button 
        v-for="page in displayedPages" 
        :key="page"
        :class="{ active: page === currentPage }"
        @click="$emit('page-change', page)"
      >
        {{ page }}
      </button>
    </div>

    <button 
      @click="handleNext"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const displayedPages = computed(() => {
      const pages = []
      const start = Math.max(1, props.currentPage - 2)
      const end = Math.min(props.totalPages, props.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    const handlePrevious = () => {
      if (props.currentPage > 1) {
        emit('page-change', props.currentPage - 1)
      }
    }

    const handleNext = () => {
      if (props.currentPage < props.totalPages) {
        emit('page-change', props.currentPage + 1)
      }
    }

    return {
      displayedPages,
      handlePrevious,
      handleNext
    }
  }
})
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;

  button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #f0f0f0;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
  }

  .pages {
    display: flex;
    gap: 5px;
  }
}
</style>
