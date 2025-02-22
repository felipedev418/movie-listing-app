import { useMovies } from '@/composables/useMovies'
import axios from 'axios'
import { createStore } from 'vuex'
import { mount } from '@vue/test-utils'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useMovies composable', () => {
  const store = createStore({
    state: {
      searchResults: [],
      totalPages: 0,
      currentPage: 1
    },
    mutations: {
      setSearchResults: (state, results) => state.searchResults = results,
      setTotalPages: (state, total) => state.totalPages = total,
      setCurrentPage: (state, page) => state.currentPage = page
    }
  })

  // Create a wrapper component to test the composable
  const TestComponent = {
    template: '<div></div>',
    setup() {
      return useMovies()
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch movies successfully', async () => {
    const mockResponse = {
      data: {
        data: [{ Title: 'Test Movie', Year: '2023', imdbID: '123' }],
        total_pages: 5
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mockResponse)

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [store]
      }
    })
    const { searchMovies, loading, error } = wrapper.vm

    await searchMovies('test')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/movies/search/?Title=test')
    )
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })
})
