// Full-screen backdrop behind the app. The neon sunset is always there;
// when an album is hovered, its artwork fades in on top of it.
function Background({ cover }) {
  const artworkStyle = cover
    ? { background: `linear-gradient(135deg, ${cover.colors[0]}, ${cover.colors[1]})` }
    : undefined

  return (
    <div className="background" aria-hidden="true">
      <div className="sky" />
      <div className="sun" />
      <div className="horizon-glow" />
      <div className="grid-floor">
        <div className="grid-lines" />
      </div>

      <div className={cover ? 'artwork-layer visible' : 'artwork-layer'} style={artworkStyle}>
        {cover && <span className="artwork-title">{cover.title}</span>}
      </div>
    </div>
  )
}

export default Background
