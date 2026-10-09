import { useState } from 'react'
import AlbumCover from './AlbumCover.jsx'

function AlbumCard({ artist, album, cart, isOwned, onAddToCart, onHoverCover }) {
  const [format, setFormat] = useState('physical')

  const option = album[format]
  const cartItem = cart.find((item) => item.id === `${album.id}:${format}`)
  const isSoldOut = format === 'physical' && option.stock === 0
  const isAtStockLimit = format === 'physical' && cartItem?.quantity >= option.stock
  const alreadyHaveDigital = format === 'digital' && (isOwned || cartItem)

  let buttonText = `Add to cart · $${option.price.toFixed(2)}`
  if (isSoldOut) buttonText = 'Sold out'
  else if (isOwned && format === 'digital') buttonText = 'Owned · in your library'
  else if (cartItem && format === 'digital') buttonText = 'In cart'
  else if (isAtStockLimit) buttonText = 'Max quantity in cart'

  return (
    <article
      className="album-card"
      onMouseEnter={() => onHoverCover(album)}
      onMouseLeave={() => onHoverCover(null)}
    >
      <AlbumCover colors={album.colors} title={album.title} size="large" />

      <div className="album-info">
        <h2>{album.title}</h2>
        <p className="muted">
          {album.year} · {album.tracks} tracks
        </p>

        <div className="format-toggle" role="group" aria-label="Choose a format">
          <button
            className={format === 'physical' ? 'toggle active' : 'toggle'}
            onClick={() => setFormat('physical')}
          >
            Physical
          </button>
          <button
            className={format === 'digital' ? 'toggle active' : 'toggle'}
            onClick={() => setFormat('digital')}
          >
            Digital
          </button>
        </div>

        <p className="format-label">{option.label}</p>
        {format === 'physical' ? (
          <p className="format-note">
            {isSoldOut ? 'Out of stock' : `${option.stock} left · ships in 3–5 days`}
          </p>
        ) : (
          <p className="format-note">
            Instant download, licensed to you. Each file carries your name and a unique key.
          </p>
        )}
        {cartItem && format === 'physical' && (
          <p className="format-note in-cart">{cartItem.quantity} in cart</p>
        )}

        <button
          className="primary-button"
          disabled={isSoldOut || isAtStockLimit || Boolean(alreadyHaveDigital)}
          onClick={() => onAddToCart(artist, album, format)}
        >
          {buttonText}
        </button>
      </div>
    </article>
  )
}

export default AlbumCard
