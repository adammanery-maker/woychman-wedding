import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WeddingIdentity } from '@/components/home/WeddingIdentity'

describe('WeddingIdentity', () => {
  it('renders canonical couple and location display values', () => {
    render(
      <WeddingIdentity
        coupleDisplayName="Alex & Jamie"
        locationDisplayName="Canmore, Alberta, Canada"
        weddingDateDisplay="July 16–18, 2027"
      />,
    )

    expect(screen.getByRole('heading', { name: 'Alex & Jamie' })).toBeTruthy()
    expect(screen.getByText('Canmore, Alberta, Canada')).toBeTruthy()
    expect(screen.getByText('July 16–18, 2027')).toBeTruthy()
  })
})
