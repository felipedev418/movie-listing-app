import store from '@/store'

describe('Vuex Store', () => {
  beforeEach(() => {
    localStorage.clear()
    store.state.favorites = []
  })

  it('toggles favorites correctly', () => {
    const testMovie = { Title: 'Test Movie', Year: '2023', imdbID: '1' }
    
    // Add to favorites
    store.commit('toggleFavorite', testMovie)
    expect(store.state.favorites).toContainEqual(testMovie)
    
    // Remove from favorites
    store.commit('toggleFavorite', testMovie)
    expect(store.state.favorites).not.toContainEqual(testMovie)
  })

  it('initializes favorites from localStorage', () => {
    const savedFavorites = [{ Title: 'Saved Movie', Year: '2023', imdbID: '1' }]
    localStorage.setItem('favorites', JSON.stringify(savedFavorites))
    
    store.commit('initializeFavorites')
    expect(store.state.favorites).toEqual(savedFavorites)
  })

  it('updates search results and pagination', () => {
    const mockResults = [{ Title: 'Search Result', Year: '2023', imdbID: '1' }]
    
    store.commit('setSearchResults', mockResults)
    store.commit('setCurrentPage', 2)
    store.commit('setTotalPages', 5)
    
    expect(store.state.searchResults).toEqual(mockResults)
    expect(store.state.currentPage).toBe(2)
    expect(store.state.totalPages).toBe(5)
  })
})
