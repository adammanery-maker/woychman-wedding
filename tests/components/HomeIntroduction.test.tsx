import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeIntroduction } from '@/components/home/HomeIntroduction'

describe('HomeIntroduction', () => {
  it('does not render an empty editorial section', () => {
    const { container } = render(<HomeIntroduction />)

    expect(container.childElementCount).toBe(0)
    expect(screen.queryByRole('heading')).toBeNull()
  })
})
