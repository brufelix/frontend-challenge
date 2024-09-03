import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BasketPage } from '../Basket';
import { useBasket } from '~/hooks/use-basket.hook';
import { useNavigate } from 'react-router-dom';
import { notify } from '~/utils/notify.util';
import { URLS } from '~/constants/urls';

jest.mock('~/hooks/use-basket.hook', () => ({
  useBasket: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('~/utils/notify.util', () => ({
  notify: jest.fn(),
}));

describe('BasketPage Component', () => {
  const mockNavigate = jest.fn();
  const mockSetItems = jest.fn();

  beforeEach(() => {
    (useBasket as jest.Mock).mockReturnValue({
      setItems: mockSetItems,
      items: [
        {
          id: 1,
          title: 'Produto 1',
          price: 100,
          quantity: 1,
          image: 'image1.jpg',
        },
        {
          id: 2,
          title: 'Produto 2',
          price: 200,
          quantity: 2,
          image: 'image2.jpg',
        },
      ],
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render basket items', () => {
    render(<BasketPage />);

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText(/R\$\s?100,00/)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s?400,00/)).toBeInTheDocument();
  });

  it('should increment item quantity', async () => {
    render(<BasketPage />);
    const incrementButtons = screen.getAllByRole('button', { name: /increment-item/i });

    // Verifique se encontrou ao menos um botão
    expect(incrementButtons).toHaveLength(2);

    await userEvent.click(incrementButtons[0]);

    expect(mockSetItems).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ id: 1, quantity: 2 }),
    ]));
  });

  it('should decrement item quantity', async () => {
    render(<BasketPage />);

    // Encontra o botão de decremento usando o aria-label
    const decrementButton = screen.getAllByRole('button', { name: /decrement-item/i })[1];

    await userEvent.click(decrementButton);

    expect(mockSetItems).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ id: 2, quantity: 1 }),
    ]));
  });

  it('should remove an item', async () => {
    render(<BasketPage />);
    const removeButton = screen.getAllByRole('button', { name: /remover/i })[0];

    await userEvent.click(removeButton);

    expect(mockSetItems).toHaveBeenCalledWith(expect.arrayContaining([
      expect.not.objectContaining({ id: 1 }),
    ]));
  });

  it('should remove all items', async () => {
    render(<BasketPage />);
    const removeAllButton = screen.getByRole('button', { name: /remover todos/i });

    await userEvent.click(removeAllButton);

    expect(mockSetItems).toHaveBeenCalledWith([]);
  });

  it('should finish purchase', async () => {
    render(<BasketPage />);
    const finishButton = screen.getByRole('button', { name: /finalizar compra/i });

    await userEvent.click(finishButton);

    expect(mockSetItems).toHaveBeenCalledWith([]);
    expect(notify).toHaveBeenCalledWith('Compra finalizada com sucesso!', { type: 'success' });
    expect(mockNavigate).toHaveBeenCalledWith(URLS.dashboard);
  });

  it('should show empty cart message when no items', () => {
    (useBasket as jest.Mock).mockReturnValue({
      setItems: mockSetItems,
      items: [],
    });

    render(<BasketPage />);
    expect(screen.getByText('Seu carrinho está vazio.')).toBeInTheDocument();
  });
});
