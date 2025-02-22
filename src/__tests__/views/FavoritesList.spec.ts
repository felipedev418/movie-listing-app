import { mount } from '@vue/test-utils'
import FavoritesList from '@/views/FavoritesList.vue'
import { createStore } from 'vuex'

describe('FavoritesList.vue', () => {
  const store = createStore({
    state: {
      favorites: [
        { Title: 'Favorite 1', Year: '2023', imdbID: '1' },
        { Title: 'Favorite 2', Year: '2023', imdbID: '2' }
      ]
    }
  })

  it('displays favorites correctly', () => {
    const wrapper = mount(FavoritesList, {
      global: {
        plugins: [store],
        stubs: ['MovieGrid', 'Pagination']
      }
    })

    expect(wrapper.text()).toContain('My Favorites')
    expect(wrapper.findComponent({ name: 'MovieGrid' }).exists()).toBe(true)
  })

  it('shows empty state when no favorites', () => {
    const emptyStore = createStore({
      state: {
        favorites: []
      }
    })

    const wrapper = mount(FavoritesList, {
      global: {
        plugins: [emptyStore],
        stubs: ['MovieGrid', 'Pagination']
      }
    })

    expect(wrapper.find('.empty-state').text()).toBe('No favorite movies yet')
  })
})
