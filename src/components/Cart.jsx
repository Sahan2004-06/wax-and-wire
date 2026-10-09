import { useState } from 'react'

function Cart({ cart, lastOrder, onRemove, onCheckout, onClose, onViewLibrary }) {
  const [buyerName, setBuyerName] = useState('')

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const hasDigital = cart.some((item) => item.format === 'digital')
  const canCheckout = cart.length > 0 && buyerName.trim().length > 1

  function handleSubmit(event) {
    event.preventDefault()
    if (!canCheckout) return
    onCheckout(buyerName.trim())
  }

  return (
    <aside className="cart" aria-label="Shopping cart">
      <div className="cart-header">
        <h2>Your cart</h2>
        <button className="close-button" onClick={onClose} aria-label="Close cart">
          ×
        </button>
      </div>

      {cart.length === 0 && lastOrder && (
        <div className="order-confirmation">
          <h3>Thanks, {lastOrder.buyer}!</h3>
          {lastOrder.physicalCount > 0 && (
            <p>Your physical order is being packed and will ship in 3–5 days.</p>
          )}
          {lastOrder.digitalCount > 0 && (
            <>
              <p>Your digital copies are licensed to you and ready in your library.</p>
              <button className="primary-button" onClick={onViewLibrary}>
                Go to My Library
              </button>
            </>
          )}
        </div>
      )}

      {cart.length === 0 && !lastOrder && <p className="empty">Your cart is empty.</p>}

      {cart.length > 0 && (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.title}</strong>
                  <span className="muted">
                    {item.artistName} · {item.label}
                    {item.quantity > 1 && ` × ${item.quantity}`}
                  </span>
                </div>
                <div className="cart-item-side">
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="text-button" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <label htmlFor="buyer-name">Full name</label>
            <input
              id="buyer-name"
              type="text"
              value={buyerName}
              onChange={(event) => setBuyerName(event.target.value)}
              placeholder="Name on the order"
            />
            {hasDigital && (
              <p className="format-note">
                Digital files will be licensed to and stamped with: {' '}
                <strong>{buyerName.trim() || '…'}</strong>
              </p>
            )}
            <div className="cart-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button type="submit" className="primary-button" disabled={!canCheckout}>
              Place order
            </button>
            <p className="fine-print">Demo store. No payment is taken.</p>
          </form>
        </>
      )}
    </aside>
  )
}

export default Cart
