import { ChangeEvent, ReactNode, useMemo, useRef, useState } from "react"

type IconName = "arrow" | "bell" | "camera" | "check" | "chevron" | "edit" | "gallery" | "home" | "list" | "more" | "star" | "trash" | "user" | "x"

type Review = {
  id: number
  bookingId: string
  author: string
  initials: string
  kos: string
  room: string
  rating: number
  comment: string
  date: string
  dateValue: number
  helpful: number
  photo?: string
  isMine?: boolean
}

type Screen = "kos" | "mine" | "form"
type Sort = "latest" | "highest" | "lowest"

const propertyImage = "/assets/8196d.png"
const reviewImage = "/assets/e1341.png"

const initialReviews: Review[] = [
  {
    id: 1,
    bookingId: "BK-0824",
    author: "Nadia Putri",
    initials: "NP",
    kos: "Kos Nopal",
    room: "Kamar A-12",
    rating: 5,
    comment:
      "Kamarnya bersih dan nyaman. Ibu kos juga ramah, fasilitas sesuai foto, dan lokasinya dekat kampus.",
    date: "12 Juni 2025",
    dateValue: 20250612,
    helpful: 18,
    photo: reviewImage,
  },
  {
    id: 2,
    bookingId: "BK-0711",
    author: "Raka Pratama",
    initials: "RP",
    kos: "Kos Nopal",
    room: "Kamar B-03",
    rating: 4,
    comment:
      "Lingkungan tenang dan akses mudah. Wi-Fi cukup cepat, hanya area parkir agak sempit.",
    date: "28 Mei 2025",
    dateValue: 20250528,
    helpful: 9,
  },
  {
    id: 3,
    bookingId: "BK-0619",
    author: "Salsa Maharani",
    initials: "SM",
    kos: "Kos Nopal",
    room: "Kamar A-08",
    rating: 5,
    comment:
      "Betah selama setahun di sini. Pengelola responsif dan semua fasilitas terawat dengan baik.",
    date: "9 Mei 2025",
    dateValue: 20250509,
    helpful: 13,
  },
  {
    id: 4,
    bookingId: "BK-0128",
    author: "Imam Zuhdi",
    initials: "IZ",
    kos: "Griya Anggrek Executive",
    room: "Kamar 204",
    rating: 4,
    comment:
      "Lokasi strategis dan kamar cukup luas. Proses check-in juga mudah dan cepat.",
    date: "18 April 2025",
    dateValue: 20250418,
    helpful: 6,
    isMine: true,
    photo: propertyImage,
  },
]

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="m15 18-6-6 6-6" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m8 10 4 4 4-4" />,
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  gallery: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  star: (
    <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z" />
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
}

function Icon({
  name,
  size = 20,
  filled = false,
}: {
  name: IconName
  size?: number
  filled?: boolean
}) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill={filled ? "currentColor" : "none"}
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function ActionButton({
  children,
  className = "",
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  ariaLabel?: string
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={`action-button ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

function Stars({
  value,
  size = 16,
  interactive = false,
  onChange,
}: {
  value: number
  size?: number
  interactive?: boolean
  onChange?: (value: number) => void
}) {
  return (
    <div className={`stars ${interactive ? "stars-interactive" : ""}`}>
      {[1, 2, 3, 4, 5].map((star) =>
        interactive ? (
          <ActionButton
            ariaLabel={`Beri rating ${star} bintang`}
            className={star <= value ? "star-active" : "star-muted"}
            key={star}
            onClick={() => onChange?.(star)}
          >
            <Icon filled name="star" size={size} />
          </ActionButton>
        ) : (
          <span
            className={star <= value ? "star-active" : "star-muted"}
            key={star}
          >
            <Icon filled name="star" size={size} />
          </span>
        ),
      )}
    </div>
  )
}

function Header({
  title,
  subtitle,
  back,
}: {
  title: string
  subtitle?: string
  back?: () => void
}) {
  return (
    <header className="topbar">
      {back ? (
        <ActionButton
          ariaLabel="Kembali"
          className="icon-button"
          onClick={back}
        >
          <Icon name="arrow" />
        </ActionButton>
      ) : (
        <div className="avatar">IZ</div>
      )}
      <div className="topbar-copy">
        {subtitle && <span className="eyebrow">{subtitle}</span>}
        <strong>{title}</strong>
      </div>
      <ActionButton ariaLabel="Notifikasi" className="icon-button notification">
        <Icon name="bell" />
        <span className="notification-dot" />
      </ActionButton>
    </header>
  )
}

function Summary() {
  const bars = [
    [5, 78],
    [4, 16],
    [3, 4],
    [2, 1],
    [1, 1],
  ]
  return (
    <section className="summary-card">
      <div className="score">
        <strong>4.8</strong>
        <Stars value={5} />
        <span>124 ulasan</span>
      </div>
      <div className="distribution">
        {bars.map(([star, width]) => (
          <div className="bar-row" key={star}>
            <span>{star}</span>
            <Icon filled name="star" size={12} />
            <div className="bar-track">
              <span style={{ width: `${width}%` }} />
            </div>
            <small>{width}%</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function ReviewCard({
  review,
  mine = false,
  onEdit,
  onDelete,
}: {
  review: Review
  mine?: boolean
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <article className="review-card">
      {mine && (
        <div className="review-property">
          <img
            alt=""
            src={review.kos === "Kos Nopal" ? propertyImage : reviewImage}
          />
          <div>
            <strong>{review.kos}</strong>
            <span>{review.room}</span>
          </div>
          <span className="published">
            <Icon name="check" size={12} /> Dipublikasi
          </span>
        </div>
      )}
      <div className="review-author">
        <div className="review-avatar">{review.initials}</div>
        <div className="author-copy">
          <strong>{review.author}</strong>
          <span>{review.date}</span>
        </div>
        {mine ? (
          <div className="review-actions">
            <ActionButton
              ariaLabel="Edit ulasan"
              className="plain-icon"
              onClick={onEdit}
            >
              <Icon name="edit" size={17} />
            </ActionButton>
            <ActionButton
              ariaLabel="Hapus ulasan"
              className="plain-icon danger"
              onClick={onDelete}
            >
              <Icon name="trash" size={17} />
            </ActionButton>
          </div>
        ) : (
          <ActionButton ariaLabel="Menu ulasan" className="plain-icon">
            <Icon name="more" size={18} />
          </ActionButton>
        )}
      </div>
      <Stars value={review.rating} />
      <p className="review-comment">{review.comment}</p>
      {review.photo && (
        <img
          className="review-photo"
          src={review.photo}
          alt="Foto dari ulasan"
        />
      )}
      {!mine && (
        <div className="helpful">
          <span>Ulasan ini membantu?</span>
          <ActionButton className="helpful-button">
            <span>Ya</span> · {review.helpful}
          </ActionButton>
        </div>
      )}
    </article>
  )
}

function BottomNav({
  screen,
  navigate,
}: {
  screen: Screen
  navigate: (screen: Screen) => void
}) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <ActionButton onClick={() => navigate("kos")}>
        <Icon name="home" />
        <span>Beranda</span>
      </ActionButton>
      <ActionButton
        className={screen === "kos" ? "active" : ""}
        onClick={() => navigate("kos")}
      >
        <Icon name="list" />
        <span>Ulasan Kos</span>
      </ActionButton>
      <ActionButton
        className={screen === "mine" ? "active" : ""}
        onClick={() => navigate("mine")}
      >
        <Icon name="user" />
        <span>Ulasan Saya</span>
      </ActionButton>
    </nav>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("kos")
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [filter, setFilter] = useState(0)
  const [sort, setSort] = useState<Sort>("latest")
  const [editing, setEditing] = useState<Review | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [photo, setPhoto] = useState<string | undefined>()
  const [toast, setToast] = useState("")
  const galleryRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const visibleReviews = useMemo(() => {
    const result = reviews.filter(
      (item) => !item.isMine && (!filter || item.rating === filter),
    )
    return result.sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating
      if (sort === "lowest") return a.rating - b.rating
      return b.dateValue - a.dateValue
    })
  }, [filter, reviews, sort])

  const mine = reviews.filter((review) => review.isMine)

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }

  function openForm(review?: Review) {
    setEditing(review ?? null)
    setRating(review?.rating ?? 0)
    setComment(review?.comment ?? "")
    setPhoto(review?.photo)
    setScreen("form")
  }

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(String(reader.result))
    reader.readAsDataURL(file)
  }

  function saveReview() {
    if (!rating || comment.trim().length < 10) {
      showToast("Pilih rating dan tulis komentar minimal 10 karakter.")
      return
    }
    if (editing) {
      setReviews((items) =>
        items.map((item) =>
          item.id === editing.id
            ? { ...item, rating, comment: comment.trim(), photo }
            : item,
        ),
      )
      showToast("Ulasan berhasil diperbarui.")
    } else {
      setReviews((items) => [
        ...items,
        {
          id: Date.now(),
          bookingId: "BK-1029",
          author: "Imam Zuhdi",
          initials: "IZ",
          kos: "Kos Nopal",
          room: "Kamar A-06",
          rating,
          comment: comment.trim(),
          date: "Hari ini",
          dateValue: 20250624,
          helpful: 0,
          photo,
          isMine: true,
        },
      ])
      showToast("Ulasan berhasil dipublikasikan.")
    }
    setScreen("mine")
  }

  function deleteReview(review: Review) {
    if (window.confirm(`Hapus ulasan untuk ${review.kos}?`)) {
      setReviews((items) => items.filter((item) => item.id !== review.id))
      showToast("Ulasan berhasil dihapus.")
    }
  }

  if (screen === "form") {
    return (
      <main className="app-shell">
        <Header
          back={() => setScreen("mine")}
          title={editing ? "Edit Ulasan" : "Beri Ulasan"}
        />
        <div className="page-content form-page">
          <section className="booking-card">
            <img alt="Kos Nopal" src={propertyImage} />
            <div>
              <span className="eyebrow">SEWA TELAH SELESAI</span>
              <strong>{editing?.kos ?? "Kos Nopal"}</strong>
              <small>
                {editing?.room ?? "Kamar A-06"} · 29 Mei–29 Juni 2025
              </small>
            </div>
          </section>

          <section className="form-section rating-section">
            <strong>Bagaimana pengalamanmu?</strong>
            <span>Ketuk bintang untuk memberi rating</span>
            <Stars interactive onChange={setRating} size={38} value={rating} />
            <b>
              {
                [
                  "",
                  "Sangat buruk",
                  "Kurang",
                  "Cukup",
                  "Bagus",
                  "Sangat memuaskan",
                ][rating]
              }
            </b>
          </section>

          <section className="form-section">
            <label htmlFor="review-comment">
              Ceritakan pengalamanmu <span>*</span>
            </label>
            <textarea
              id="review-comment"
              maxLength={500}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Bagikan pengalaman tentang kamar, fasilitas, lokasi, dan pengelola kos..."
              value={comment}
            />
            <small>{comment.length}/500</small>
          </section>

          <section className="form-section">
            <label>
              Tambahkan foto <em>Opsional</em>
            </label>
            <p>
              Foto membantu penyewa lain mendapatkan gambaran yang lebih jelas.
            </p>
            <div className="photo-actions">
              <ActionButton
                className="photo-button"
                onClick={() => cameraRef.current?.click()}
              >
                <Icon name="camera" />
                <span>Kamera</span>
              </ActionButton>
              <ActionButton
                className="photo-button"
                onClick={() => galleryRef.current?.click()}
              >
                <Icon name="gallery" />
                <span>Galeri</span>
              </ActionButton>
            </div>
            <input
              accept="image/*"
              capture="environment"
              className="hidden-input"
              onChange={handlePhoto}
              ref={cameraRef}
              type="file"
            />
            <input
              accept="image/*"
              className="hidden-input"
              onChange={handlePhoto}
              ref={galleryRef}
              type="file"
            />
            {photo && (
              <div className="photo-preview">
                <img alt="Pratinjau foto ulasan" src={photo} />
                <ActionButton
                  ariaLabel="Hapus foto"
                  className="remove-photo"
                  onClick={() => setPhoto(undefined)}
                >
                  <Icon name="x" size={15} />
                </ActionButton>
              </div>
            )}
          </section>
          <div className="rule-note">
            <Icon name="check" size={16} />
            Satu booking yang telah selesai hanya dapat diberi satu ulasan.
          </div>
        </div>
        <footer className="form-footer">
          <ActionButton className="primary-button" onClick={saveReview}>
            {editing ? "Simpan Perubahan" : "Publikasikan Ulasan"}
          </ActionButton>
        </footer>
        {toast && <div className="toast">{toast}</div>}
      </main>
    )
  }

  if (screen === "mine") {
    return (
      <main className="app-shell with-nav">
        <Header subtitle="Riwayat & aktivitas" title="Ulasan Saya" />
        <div className="page-content">
          <section className="reminder-card">
            <div className="reminder-icon">
              <Icon name="star" filled size={22} />
            </div>
            <div>
              <strong>Bagikan pengalamanmu</strong>
              <span>Sewa Kos Nopal telah selesai. Ulas sekarang!</span>
            </div>
            <ActionButton
              className="reminder-action"
              onClick={() => openForm()}
            >
              Ulas
            </ActionButton>
          </section>

          <div className="section-title">
            <div>
              <strong>Ulasan dipublikasi</strong>
              <span>{mine.length} ulasan</span>
            </div>
          </div>
          <div className="review-list">
            {mine.length ? (
              mine.map((review) => (
                <ReviewCard
                  key={review.id}
                  mine
                  onDelete={() => deleteReview(review)}
                  onEdit={() => openForm(review)}
                  review={review}
                />
              ))
            ) : (
              <div className="empty-state">
                <div>
                  <Icon name="star" size={28} />
                </div>
                <strong>Belum ada ulasan</strong>
                <span>
                  Ulas booking yang sudah selesai untuk membantu penyewa lain.
                </span>
                <ActionButton
                  className="primary-button compact"
                  onClick={() => openForm()}
                >
                  Tulis Ulasan
                </ActionButton>
              </div>
            )}
          </div>
        </div>
        <BottomNav navigate={setScreen} screen={screen} />
        {toast && <div className="toast">{toast}</div>}
      </main>
    )
  }

  return (
    <main className="app-shell with-nav">
      <Header
        back={() => undefined}
        subtitle="Detail Kos"
        title="Ulasan Penghuni"
      />
      <div className="property-compact">
        <img alt="Kos Nopal" src={propertyImage} />
        <div>
          <span className="tag">PUTRI</span>
          <strong>Kos Nopal</strong>
          <small>RB Teknik 02, Yogyakarta</small>
        </div>
      </div>
      <div className="page-content reviews-page">
        <Summary />
        <div className="section-title">
          <div>
            <strong>Semua Ulasan</strong>
            <span>{visibleReviews.length} ditampilkan</span>
          </div>
          <label className="sort-control">
            <span className="sr-only">Urutkan ulasan</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
            >
              <option value="latest">Terbaru</option>
              <option value="highest">Rating tertinggi</option>
              <option value="lowest">Rating terendah</option>
            </select>
            <Icon name="chevron" size={14} />
          </label>
        </div>
        <div className="filter-row" aria-label="Filter rating">
          {[0, 5, 4, 3, 2, 1].map((item) => (
            <ActionButton
              className={`filter-chip ${filter === item ? "selected" : ""}`}
              key={item}
              onClick={() => setFilter(item)}
            >
              {item === 0 ? (
                "Semua"
              ) : (
                <>
                  <Icon filled name="star" size={13} /> {item}
                </>
              )}
            </ActionButton>
          ))}
        </div>
        <div className="review-list">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      <BottomNav navigate={setScreen} screen={screen} />
    </main>
  )
}
