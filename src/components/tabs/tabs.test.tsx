import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '.';
import { DirectionProvider } from '../../providers/direction';

const tabs = (props = {}) => (
  <Tabs defaultValue="account" {...props}>
    <TabsList label="Settings">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="team" disabled>
        Team
      </TabsTrigger>
      <TabsTrigger value="alerts">Alerts</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Account panel</TabsContent>
    <TabsContent value="billing">Billing panel</TabsContent>
    <TabsContent value="team">Team panel</TabsContent>
    <TabsContent value="alerts">Alerts panel</TabsContent>
  </Tabs>
);

describe('Tabs', () => {
  it('wires every tab to its panel', () => {
    render(tabs());
    const tab = screen.getByRole('tab', { name: 'Account' });
    const panel = screen.getByRole('tabpanel');
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('is a named tablist', () => {
    render(tabs());
    expect(
      screen.getByRole('tablist', { name: 'Settings' }),
    ).toBeInTheDocument();
  });

  it('switches panels on click', async () => {
    render(tabs());
    await userEvent.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(screen.getByText('Billing panel')).toBeInTheDocument();
    expect(screen.queryByText('Account panel')).toBeNull();
  });

  it('reports the selected value', async () => {
    const onValueChange = vi.fn();
    render(tabs({ value: 'account', onValueChange }));
    await userEvent.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(onValueChange).toHaveBeenCalledWith('billing');
  });

  // One Tab stop for the whole set, arrows to move within it. Otherwise a
  // keyboard user presses Tab once per tab to reach the panel.
  it('rovs focus with a single tab stop', () => {
    render(tabs());
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('moves with the arrow keys and skips disabled tabs', async () => {
    render(tabs());
    screen.getByRole('tab', { name: 'Account' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Alerts' })).toHaveFocus();
  });

  it('wraps around, and jumps with Home and End', async () => {
    render(tabs());
    screen.getByRole('tab', { name: 'Account' }).focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Alerts' })).toHaveFocus();
    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Alerts' })).toHaveFocus();
  });

  // ArrowRight means "next" in English and "previous" in Persian.
  it('follows the reading direction', async () => {
    render(
      <DirectionProvider locale="fa" attributeTarget="self">
        {tabs()}
      </DirectionProvider>,
    );
    screen.getByRole('tab', { name: 'Account' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Alerts' })).toHaveFocus();
  });

  it('selects as focus arrives by default', async () => {
    render(tabs());
    screen.getByRole('tab', { name: 'Account' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Billing panel')).toBeInTheDocument();
  });

  // Arrowing past four tabs that each fetch should not fire four requests.
  it('waits for Enter in manual mode', async () => {
    render(tabs({ activationMode: 'manual' }));
    screen.getByRole('tab', { name: 'Account' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Account panel')).toBeInTheDocument();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('Billing panel')).toBeInTheDocument();
  });

  it('keeps a panel mounted when asked, but hidden', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList label="Set">
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A panel</TabsContent>
        <TabsContent value="b" keepMounted>
          B panel
        </TabsContent>
      </Tabs>,
    );
    const hidden = screen.getByText('B panel');
    expect(hidden).toBeInTheDocument();
    expect(hidden).not.toBeVisible();
  });

  it('refuses to render a trigger outside Tabs', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TabsTrigger value="a">A</TabsTrigger>)).toThrow();
    error.mockRestore();
  });
});
