function AlbumCover({ colors, title, size = 'medium' }) {
  const style = { background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }

  return (
    <div className={`cover cover-${size}`} style={style}>
      <span className="cover-title">{title}</span>
    </div>
  )
}

export default AlbumCover
