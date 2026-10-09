import { useState } from 'react'
import artists from './data/artists.js'
import { createLicenseKey } from './utils/license.js'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import ArtistList from './components/ArtistList.jsx'
import ArtistDetail from './components/ArtistDetail.jsx'
import Cart from './components/Cart.jsx'
import Library from './components/Library.jsx'
import Background from './components/Background.jsx'
import CdCursor from './components/CdCursor.jsx'

const genres = ['All', ...new Set(artists.map((artist) => artist.genre))]

function App() {
  const [view, setView] = useState('store')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [selectedArtistId, setSelectedArtistId] = useState(null)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [library, setLibrary] = useState([])
  const [lastOrder, setLastOrder] = useState(null)
  const [hoveredCover, setHoveredCover] = useState(null)

  const query = search.trim().toLowerCase()
  const visibleArtists = artists.filter((artist) => {
    const matchesGenre = genre === 'All' || artist.genre === genre
    const matchesSearch =
      artist.name.toLowerCase().includes(query) ||
      artist.albums.some((album) => album.title.toLowerCase().includes(query))
    return matchesGenre && matchesSearch
  })

  const selectedArtist = artists.find((artist) => artist.id === selectedArtistId)
  const ownedAlbumIds = library.map((item) => item.albumId)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  function addToCart(artist, album, format) {
    const id = `${album.id}:${format}`
    const existing = cart.find((item) => item.id === id)

    if (existing) {
      // Only physical copies can be bought more than once, up to stock.
      if (format === 'digital' || existing.quantity >= album.physical.stock) return
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
      return
    }

    const newItem = {
      id,
      albumId: album.id,
      title: album.title,
      artistName: artist.name,
      format,
      label: album[format].label,
      price: album[format].price,
      quantity: 1,
    }
    setCart([...cart, newItem])
    setLastOrder(null)
    setIsCartOpen(true)
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  function checkout(buyerName) {
    const digitalItems = cart.filter((item) => item.format === 'digital')
    const newLicenses = digitalItems.map((item) => ({
      licenseKey: createLicenseKey(),
      albumId: item.albumId,
      title: item.title,
      artistName: item.artistName,
      buyer: buyerName,
      downloadsUsed: 0,
    }))

    setLibrary([...library, ...newLicenses])
    setLastOrder({
      buyer: buyerName,
      physicalCount: cart.filter((item) => item.format === 'physical').length,
      digitalCount: digitalItems.length,
    })
    setCart([])
  }

  function recordDownload(licenseKey) {
    setLibrary(
      library.map((item) =>
        item.licenseKey === licenseKey
          ? { ...item, downloadsUsed: item.downloadsUsed + 1 }
          : item,
      ),
    )
  }

  function showStore() {
    setView('store')
    setSelectedArtistId(null)
    setHoveredCover(null)
  }

  function selectArtist(artistId) {
    setSelectedArtistId(artistId)
    // The hovered card unmounts on navigation, so reset the background here.
    setHoveredCover(null)
  }

  return (
    <div className="app">
      <Background cover={hoveredCover} />
      <CdCursor />
      <Header
        view={view}
        cartCount={cartCount}
        libraryCount={library.length}
        onShowStore={showStore}
        onShowLibrary={() => {
          setView('library')
          setHoveredCover(null)
        }}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="main">
        {view === 'library' && (
          <Library library={library} onDownload={recordDownload} onBrowse={showStore} />
        )}

        {view === 'store' && selectedArtist && (
          <ArtistDetail
            artist={selectedArtist}
            cart={cart}
            ownedAlbumIds={ownedAlbumIds}
            onAddToCart={addToCart}
            onHoverCover={setHoveredCover}
            onBack={() => selectArtist(null)}
          />
        )}

        {view === 'store' && !selectedArtist && (
          <>
            <section className="hero">
              <h1>Own the record. Or the file. Or both.</h1>
              <p>
                Physical copies ship to your door. Digital copies are licensed to you
                and stamped with your name.
              </p>
            </section>
            <SearchBar
              search={search}
              onSearchChange={setSearch}
              genres={genres}
              genre={genre}
              onGenreChange={setGenre}
            />
            <ArtistList
              artists={visibleArtists}
              onSelect={selectArtist}
              onHoverCover={setHoveredCover}
            />
          </>
        )}
      </main>

      {isCartOpen && (
        <Cart
          cart={cart}
          lastOrder={lastOrder}
          onRemove={removeFromCart}
          onCheckout={checkout}
          onClose={() => setIsCartOpen(false)}
          onViewLibrary={() => {
            setView('library')
            setIsCartOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default App
