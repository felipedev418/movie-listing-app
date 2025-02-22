import { mount } from '@vue/test-utils'
import SearchBar from '@/components/search/SearchBar.vue'
import { createStore } from 'vuex'

describe('SearchBar.vue', () => {
  const store = createStore({
    state: {
      searchQuery: ''
    },
    mutations: {
      setSearchQuery: (state, query) => state.searchQuery = query
    }
  })

  it('updates search query on input', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [store]
      }
    })

    const input = wrapper.find('input')
    await input.setValue('test movie')
    await input.trigger('keyup.enter')

    expect(store.state.searchQuery).toBe('test movie')
  })

  it('clears search on refresh button click', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [store]
      }
    })

    const refreshBtn = wrapper.find('.refresh-btn')
    await refreshBtn.trigger('click')

    expect(store.state.searchQuery).toBe('')
  })
})
