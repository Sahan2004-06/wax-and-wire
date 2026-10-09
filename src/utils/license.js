// Builds the "digital copy" a buyer downloads.
//
// A front-end-only app has no real audio files or server, so this
// generates a short tone as a WAV file in the browser. The important
// part is the anti-sharing design:
//
//   1. Every download is stamped with the buyer's name and a unique
//      license key, written into the file's metadata (a watermark).
//      If the file shows up somewhere it shouldn't, it traces back
//      to exactly one purchase.
//   2. Each license allows a limited number of downloads
//      (DOWNLOAD_LIMIT), tracked in App state.
//
// A production store would also generate the file on a server and hand
// out short-lived signed URLs, so the download link itself can't be shared.

export const DOWNLOAD_LIMIT = 3

const SAMPLE_RATE = 8000
const SECONDS = 2

// Writes a plain ASCII string into the byte view at `offset`.
function writeText(view, offset, text) {
  for (let i = 0; i < text.length; i++) {
    view.setUint8(offset + i, text.charCodeAt(i))
  }
}

// Makes a short random license key such as "WW-7F3A-91C2".
export function createLicenseKey() {
  const hex = crypto.randomUUID().replace(/-/g, '').toUpperCase()
  return `WW-${hex.slice(0, 4)}-${hex.slice(4, 8)}`
}

// Returns a Blob containing a WAV file whose metadata holds the watermark.
export function makeLicensedTrack({ title, artist, buyer, licenseKey }) {
  // RIFF "INFO" comment field. WAV metadata strings must be even length.
  let comment = `Licensed to ${buyer} | Key ${licenseKey} | Personal use only, do not share`
  if (comment.length % 2 !== 0) comment += ' '

  const sampleCount = SAMPLE_RATE * SECONDS
  const audioBytes = sampleCount // 8-bit mono: one byte per sample
  const infoBytes = 4 + 8 + comment.length // "INFO" + ICMT header + text
  const totalBytes = 44 + audioBytes + 8 + infoBytes

  const buffer = new ArrayBuffer(totalBytes)
  const view = new DataView(buffer)

  // Standard 44-byte WAV header.
  writeText(view, 0, 'RIFF')
  view.setUint32(4, totalBytes - 8, true)
  writeText(view, 8, 'WAVE')
  writeText(view, 12, 'fmt ')
  view.setUint32(16, 16, true) // fmt chunk size
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, 1, true) // mono
  view.setUint32(24, SAMPLE_RATE, true)
  view.setUint32(28, SAMPLE_RATE, true) // bytes per second
  view.setUint16(32, 1, true) // block align
  view.setUint16(34, 8, true) // bits per sample
  writeText(view, 36, 'data')
  view.setUint32(40, audioBytes, true)

  // A soft 440 Hz tone (8-bit audio is centered on 128).
  for (let i = 0; i < sampleCount; i++) {
    const sample = Math.sin((2 * Math.PI * 440 * i) / SAMPLE_RATE)
    view.setUint8(44 + i, 128 + Math.round(sample * 40))
  }

  // Metadata chunk with the watermark.
  let offset = 44 + audioBytes
  writeText(view, offset, 'LIST')
  view.setUint32(offset + 4, infoBytes, true)
  writeText(view, offset + 8, 'INFO')
  writeText(view, offset + 12, 'ICMT')
  view.setUint32(offset + 16, comment.length, true)
  writeText(view, offset + 20, comment)

  const blob = new Blob([buffer], { type: 'audio/wav' })
  const fileName = `${artist} - ${title} [${licenseKey}].wav`
  return { blob, fileName }
}

// Triggers a browser download for a Blob, then frees the temporary URL.
export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  // Give the browser a moment to start the download before freeing it.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
