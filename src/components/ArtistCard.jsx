import AlbumCover from './AlbumCover.jsx'

function ArtistCard({ artist, onSelect, onHoverCover }) {
  const latestAlbum = artist.albums[0]

  return (
    <button
      className="artist-card"
      onClick={() => onSelect(artist.id)}
      onMouseEnter={() => onHoverCover(latestAlbum)}
      onMouseLeave={() => onHoverCover(null)}
    >
      <AlbumCover colors={latestAlbum.colors} title={latestAlbum.title} />
      <div className="artist-card-body">
        <span className="genre-tag">{artist.genre}</span>
        <h2>{artist.name}</h2>
        <p className="muted">
          {artist.albums.length} {artist.albums.length === 1 ? 'release' : 'releases'} ·{' '}
          {artist.hometown}
        </p>
      </div>
    </button>
  )
}

export default ArtistCard
