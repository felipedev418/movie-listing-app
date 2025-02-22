import { mount } from '@vue/test-utils'
import MovieGrid from '@/components/movies/MovieGrid.vue'

describe('MovieGrid.vue', () => {
  const mockMovies = [
    { Title: 'Test Movie 1', Year: '2023', imdbID: '1' },
    { Title: 'Test Movie 2', Year: '2023', imdbID: '2' }
  ]

  it('renders correct number of movie cards', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        movies: mockMovies
      },
      global: {
        stubs: ['MovieCard']
      }
    })

    expect(wrapper.findAllComponents({ name: 'MovieCard' })).toHaveLength(2)
  })

  it('passes movie data to MovieCard components', () => {
    const wrapper = mount(MovieGrid, {
      props: {
        movies: mockMovies
      },
      global: {
        stubs: ['MovieCard']
      }
    })

    const movieCards = wrapper.findAllComponents({ name: 'MovieCard' })
    movieCards.forEach((card, index) => {
      expect(card.props('movie')).toEqual(mockMovies[index])
    })
  })
})
