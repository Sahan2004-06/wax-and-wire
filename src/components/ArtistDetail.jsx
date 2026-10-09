import AlbumCard from './AlbumCard.jsx'

function ArtistDetail({ artist, cart, ownedAlbumIds, onAddToCart, onHoverCover, onBack }) {
  return (
    <section className="artist-detail">
      <button className="back-link" onClick={onBack}>
        ← All artists
      </button>
      <div className="artist-heading">
        <span className="genre-tag">{artist.genre}</span>
        <h1>{artist.name}</h1>
        <p className="muted">{artist.hometown}</p>
        <p>{artist.bio}</p>
      </div>

      <div className="album-list">
        {artist.albums.map((album) => (
          <AlbumCard
            key={album.id}
            artist={artist}
            album={album}
            cart={cart}
            isOwned={ownedAlbumIds.includes(album.id)}
            onAddToCart={onAddToCart}
            onHoverCover={onHoverCover}
          />
        ))}
      </div>
    </section>
  )
}

export default ArtistDetail
