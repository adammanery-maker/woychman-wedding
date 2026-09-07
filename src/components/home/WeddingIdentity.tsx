type WeddingIdentityProps = {
  coupleDisplayName: string
  locationDisplayName: string
  weddingDateDisplay: string
}

export function WeddingIdentity({ coupleDisplayName, locationDisplayName, weddingDateDisplay }: WeddingIdentityProps) {
  return (
    <header className="wedding-identity">
      <p className="eyebrow">{locationDisplayName}</p>
      <h1>{coupleDisplayName}</h1>
      <p>{weddingDateDisplay}</p>
    </header>
  )
}
