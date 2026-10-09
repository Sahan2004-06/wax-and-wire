import LibraryItem from './LibraryItem.jsx'

function Library({ library, onDownload, onBrowse }) {
  return (
    <section className="library">
      <h1>My Library</h1>
      <p className="muted">
        Digital copies you own. Every download is watermarked with your name and license key,
        and each license allows a limited number of downloads. Please don’t share your files.
      </p>

      {library.length === 0 ? (
        <div className="empty">
          <p>You don’t own any digital copies yet.</p>
          <button className="primary-button" onClick={onBrowse}>
            Browse artists
          </button>
        </div>
      ) : (
        <ul className="library-list">
          {library.map((item) => (
            <LibraryItem key={item.licenseKey} item={item} onDownload={onDownload} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Library
