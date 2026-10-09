function Header({ view, cartCount, libraryCount, onShowStore, onShowLibrary, onToggleCart }) {
  return (
    <header className="header">
      <button className="brand" onClick={onShowStore}>
        <span className="brand-disc" aria-hidden="true" />
        Wax &amp; Wire
      </button>

      <nav className="nav">
        <button
          className={view === 'store' ? 'nav-link active' : 'nav-link'}
          onClick={onShowStore}
        >
          Artists
        </button>
        <button
          className={view === 'library' ? 'nav-link active' : 'nav-link'}
          onClick={onShowLibrary}
        >
          My Library{libraryCount > 0 && <span className="badge">{libraryCount}</span>}
        </button>
        <button className="cart-button" onClick={onToggleCart}>
          Cart{cartCount > 0 && <span className="badge badge-accent">{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}

export default Header
