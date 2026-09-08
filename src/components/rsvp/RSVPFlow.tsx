'use client'

import { useEffect, useState, useTransition } from 'react'
import { lookupHouseholdAction, submitGuestResponsesAction } from '@/app/(frontend)/rsvp/actions'
import type { HouseholdView } from '@/lib/rsvp/getHouseholdByCode'

type ResponseState = { attendance: 'attending' | 'not attending'; dietaryRestrictions: string; accessibilityRequirements: string }

export function RSVPFlow({ initialCode }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode || '')
  const [household, setHousehold] = useState<HouseholdView | null>(null)
  const [responses, setResponses] = useState<Record<number, ResponseState>>({})
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!initialCode) return
    startTransition(async () => {
      const result = await lookupHouseholdAction(initialCode)
      if (!result) { setError("We couldn't find that invitation code. Check the code on your invitation and try again."); return }
      setHousehold(result)
      setResponses(Object.fromEntries(result.guests.map((guest) => [guest.id, { attendance: guest.attendance === 'not attending' ? 'not attending' : 'attending', dietaryRestrictions: guest.dietaryRestrictions || '', accessibilityRequirements: guest.accessibilityRequirements || '' }])))
    })
  }, [initialCode])

  function lookup() {
    setError(null)
    startTransition(async () => {
      const result = await lookupHouseholdAction(code)
      if (!result) { setHousehold(null); setError("We couldn't find that invitation code. Check the code on your invitation and try again."); return }
      setHousehold(result)
      setResponses(Object.fromEntries(result.guests.map((guest) => [guest.id, { attendance: guest.attendance === 'not attending' ? 'not attending' : 'attending', dietaryRestrictions: guest.dietaryRestrictions || '', accessibilityRequirements: guest.accessibilityRequirements || '' }])))
    })
  }

  function submit() {
    if (!household) return
    setError(null)
    startTransition(async () => {
      const result = await submitGuestResponsesAction({ invitationCode: code, responses: household.guests.map((guest) => ({ guestId: guest.id, ...responses[guest.id] })) })
      if (!result.ok) { setError('We couldn’t save your RSVP. Your answers are still here. Please try again.'); return }
      setConfirmed(true)
    })
  }

  if (confirmed) return <section className="rsvp-panel" aria-live="polite"><p className="eyebrow">Thank you</p><h2>Your RSVP has been received.</h2><p>We’ve saved your response for {household?.displayName}.</p></section>
  if (!household) return <section className="rsvp-panel"><h2>Find your invitation</h2><p>Enter the invitation code included with your invitation.</p><form onSubmit={(event) => { event.preventDefault(); lookup() }}><label htmlFor="invitation-code">Invitation code</label><input id="invitation-code" value={code} onChange={(event) => setCode(event.target.value)} autoComplete="off" required /><button type="submit" disabled={isPending}>{isPending ? 'Looking up…' : 'Continue'}</button></form>{error ? <p className="form-error" role="alert">{error}</p> : null}</section>
  if (reviewing) return <section className="rsvp-panel" aria-labelledby="rsvp-review-heading"><p className="eyebrow">Step 2 of 2 · Review</p><h2 id="rsvp-review-heading">Check your RSVP</h2><div className="rsvp-review">{household.guests.map((guest) => { const response = responses[guest.id]; return <div className="rsvp-review-row" key={guest.id}><strong>{guest.displayName}</strong><span>{response.attendance === 'attending' ? 'Attending' : 'Unable to attend'}</span></div> })}</div><div className="rsvp-actions"><button className="button-secondary" type="button" onClick={() => setReviewing(false)}>Edit responses</button><button type="button" onClick={submit} disabled={isPending}>{isPending ? 'Saving…' : 'Submit RSVP'}</button></div>{error ? <p className="form-error" role="alert">{error}</p> : null}</section>
  return <section className="rsvp-panel"><p className="eyebrow">Step 1 of 2 · Your invitation</p><h2>{household.displayName}</h2><p>Please respond for each invited guest.</p><div className="rsvp-guests">{household.guests.map((guest) => { const response = responses[guest.id]; return <fieldset key={guest.id}><legend>{guest.displayName}</legend><label><input type="radio" name={`attendance-${guest.id}`} checked={response.attendance === 'attending'} onChange={() => setResponses({ ...responses, [guest.id]: { ...response, attendance: 'attending' } })} /> Attending</label><label><input type="radio" name={`attendance-${guest.id}`} checked={response.attendance === 'not attending'} onChange={() => setResponses({ ...responses, [guest.id]: { ...response, attendance: 'not attending' } })} /> Unable to attend</label>{response.attendance === 'attending' ? <><label htmlFor={`dietary-${guest.id}`}>Dietary restrictions or allergies</label><textarea id={`dietary-${guest.id}`} value={response.dietaryRestrictions} onChange={(event) => setResponses({ ...responses, [guest.id]: { ...response, dietaryRestrictions: event.target.value } })} /><label htmlFor={`accessibility-${guest.id}`}>Accessibility requirements</label><textarea id={`accessibility-${guest.id}`} value={response.accessibilityRequirements} onChange={(event) => setResponses({ ...responses, [guest.id]: { ...response, accessibilityRequirements: event.target.value } })} /></> : null}</fieldset> })}</div><button type="button" onClick={() => setReviewing(true)}>Review RSVP</button>{error ? <p className="form-error" role="alert">{error}</p> : null}</section>
}
