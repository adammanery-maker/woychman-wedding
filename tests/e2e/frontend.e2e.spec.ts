import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('orients guests from the homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Jacey & Adam/)
    await expect(page.getByRole('heading', { name: 'Jacey & Adam' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Weekend details' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Travel & stay' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible()
  })
})
