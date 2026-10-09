import ArtistCard from './ArtistCard.jsx'

function ArtistList({ artists, onSelect, onHoverCover }) {
  if (artists.length === 0) {
    return <p className="empty">No artists match that search. Try another name or genre.</p>
  }

  return (
    <section className="artist-grid">
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          onSelect={onSelect}
          onHoverCover={onHoverCover}
        />
      ))}
    </section>
  )
}

export default ArtistList
