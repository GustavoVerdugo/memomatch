import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page'
import Providers from '@/providers/Providers';


describe('Home page', () => {

  beforeEach(() => { })

  it('renders home page', () => {
    render(
      <Providers>
        <HomePage />
      </Providers>)
    expect(screen.getByText('MemoMatch')).toBeInTheDocument()
    const input = screen.getByTestId('player-name');
    fireEvent.change(input, { target: { value: "Dummy name" } });
    const button = screen.getByText("Empezar Juego");
    fireEvent.click(button);
    const playerName = screen.getByText("Hola, Dummy name");
    expect(playerName).toBeInTheDocument();
  })

  it('clicks in cards', async () => {
    render(
      <Providers>
        <HomePage />
      </Providers>)
    expect(screen.getByText('MemoMatch')).toBeInTheDocument();
    const playerName = screen.getByText("Hola, Dummy name");
    expect(playerName).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-board')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      const cards = screen.getAllByTestId("card");
      expect(cards.length).toBeGreaterThan(0);
    });
    const cards = screen.getAllByTestId("card");
    fireEvent.click(cards[0]);
    await waitFor(() => {
      expect(cards[0]).toHaveClass("group");
    })
  })
})