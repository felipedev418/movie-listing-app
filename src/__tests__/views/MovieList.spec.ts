import { mount } from '@vue/test-utils'
import MovieList from '@/views/MovieList.vue'
import { createStore } from 'vuex'

describe('MovieList.vue', () => {
  const store = createStore({
    state: {
      searchResults: [
        { Title: 'Movie 1', Year: '2023', imdbID: '1' },
        { Title: 'Movie 2', Year: '2023', imdbID: '2' }
      ],
      currentPage: 1,
      totalPages: 5
    }
  })

  it('renders movie grid with search results', () => {
    const wrapper = mount(MovieList, {
      global: {
        plugins: [store],
        stubs: ['SearchBar', 'MovieGrid', 'Pagination']
      }
    })

    expect(wrapper.findComponent({ name: 'MovieGrid' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'SearchBar' }).exists()).toBe(true)
  })

  it('handles page changes correctly', async () => {
    const wrapper = mount(MovieList, {
      global: {
        plugins: [store],
        stubs: ['SearchBar', 'MovieGrid']
      }
    })

    await wrapper.findComponent({ name: 'Pagination' }).vm.$emit('page-change', 2)
    expect(store.state.currentPage).toBe(2)
  })
})
