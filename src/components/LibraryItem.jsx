import { DOWNLOAD_LIMIT, makeLicensedTrack, downloadBlob } from '../utils/license.js'

function LibraryItem({ item, onDownload }) {
  const remaining = DOWNLOAD_LIMIT - item.downloadsUsed
  const isUsedUp = remaining <= 0

  function handleDownload() {
    if (isUsedUp) return
    const { blob, fileName } = makeLicensedTrack({
      title: item.title,
      artist: item.artistName,
      buyer: item.buyer,
      licenseKey: item.licenseKey,
    })
    downloadBlob(blob, fileName)
    onDownload(item.licenseKey)
  }

  return (
    <li className="library-item">
      <div>
        <strong>{item.title}</strong>
        <span className="muted">{item.artistName}</span>
        <span className="license">
          Licensed to {item.buyer} · Key {item.licenseKey}
        </span>
      </div>
      <div className="library-item-side">
        <span className={isUsedUp ? 'downloads used-up' : 'downloads'}>
          {isUsedUp
            ? 'Download limit reached'
            : `${remaining} of ${DOWNLOAD_LIMIT} downloads left`}
        </span>
        <button className="primary-button" onClick={handleDownload} disabled={isUsedUp}>
          Download
        </button>
      </div>
    </li>
  )
}

export default LibraryItem
