import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Task } from '.'

describe('Task', () => {
  const user = userEvent.setup()
  it('renders a title for the task', () => {
    render(Task, { id: 'a', title: 'CUSTOM TITLE' })
    expect(screen.getByLabelText('CUSTOM TITLE')).toBeVisible()
  })
  it('is unchecked by default', () => {
    render(Task, { id: 'a', title: 'TITLE' })
    expect(screen.getByLabelText('TITLE')).not.toBeChecked()
  })
  it('can be instantiated as checked', () => {
    render(Task, { id: 'a', checked: true, title: 'TITLE' })
    expect(screen.getByLabelText('TITLE')).toBeChecked()
  })
  it('toggles between checked and unchecked', async () => {
    render(Task, { id: 'a', title: 'TITLE' })
    expect(screen.getByLabelText('TITLE')).not.toBeChecked()
    await user.click(screen.getByLabelText('TITLE'))
    expect(screen.getByLabelText('TITLE')).toBeChecked()
    await user.click(screen.getByLabelText('TITLE'))
    expect(screen.getByLabelText('TITLE')).not.toBeChecked()
  })
  it('fires a checked event on change', async () => {
    let value = false
    const handleChange = vi.fn().mockImplementation(event => value = event.detail.checked)
    const { component } = render(Task, { id: 'a', title: 'TITLE' })
    component.$on('change', handleChange)
    expect(handleChange).not.toHaveBeenCalled()
    await user.click(screen.getByLabelText('TITLE'))
    expect(handleChange).toHaveBeenCalledOnce()
    expect(value).toBe(true)
  })
  it('fires a titleChange event', async () => {
    let title = 'title'
    const handleTitleChange = vi.fn().mockImplementation(event => title = event.detail.title)
    const { component, rerender } = render(Task, { id: 'a', title })
    component.$on('titleChange', handleTitleChange)
    expect(handleTitleChange).not.toHaveBeenCalled()
    await user.click(screen.getByLabelText('edit'))
    expect(screen.getByRole('textbox')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveFocus()
    await user.type(screen.getByRole('textbox'), ' updated')
    await user.tab()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(handleTitleChange).toHaveBeenCalledOnce()
    expect(title).toBe('title updated')
    await rerender({ id: 'a', title: 'title updated' })
    expect(screen.getByLabelText('title updated')).toBeVisible()
  })
})
