import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../Card';
import { useBasket } from '~/hooks/use-basket.hook';
import { useTheme } from '~/hooks/use-theme.hook';

// Mock das funções que são chamadas no componente
jest.mock('~/hooks/use-basket.hook');
jest.mock('~/hooks/use-theme.hook');
jest.mock('~/utils/notify.util', () => ({
  notify: jest.fn(),
}));

describe('Card Component', () => {
  const mockSetItems = jest.fn();
  const mockNotify = require('~/utils/notify.util').notify;

  beforeEach(() => {
    // Mock para retornar valores desejados
    (useBasket as jest.Mock).mockReturnValue({
      items: [],
      setItems: mockSetItems,
    });

    (useTheme as jest.Mock).mockReturnValue({
      isDarkMode: false,
    });
  });

  const props = {
    id: 1,
    title: 'Produto de Teste',
    price: 100,
    image: 'url/to/image.jpg',
    description: 'Descrição do produto para teste Muito longa descrição que definitivamente tem mais de 100 caracteres. ' +
      'Continuando a adicionar mais texto para tornar esta descrição mais longa ' +
      'e possivelmente truncada para fins de teste.'
  };

  it('should render the card with the correct information', () => {
    render(<Card {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByAltText(props.title)).toHaveAttribute('src', props.image);
    expect(screen.getByText(/Descrição do produto para teste/)).toBeInTheDocument(); // Parte da descrição truncada

    // Usando expressão regular para localizar o preço
    expect(screen.getByText(/R\$\s?100,00/)).toBeInTheDocument();
  });

  it('should expand and collapse description on button click', () => {
    render(<Card {...props} />);

    // Encontra o botão utilizando um matcher direto para o nodo de elemento
    const toggleButton = screen.getByText((_, element) => element?.textContent === 'Ver mais');

    // Expande a descrição
    fireEvent.click(toggleButton);
    expect(screen.getByText(props.description)).toBeInTheDocument(); // Descrição completa mostrada

    // Localiza o botão para recolher a descrição
    const collapseButton = screen.getByText((_, element) => element?.textContent === 'Ver menos');

    fireEvent.click(collapseButton);
    expect(screen.getByText(/Descrição do produto para teste/)).toBeInTheDocument(); // Descrição truncada novamente
  });

  it('should add a new item to the basket when button is clicked', () => {
    // Renderiza o componente
    render(<Card {...props} />);

    // Localiza o botão de adicionar ao carrinho
    const addButton = screen.getByRole('button', { name: /Adicionar ao Carrinho/i });

    // Simula clique no botão
    fireEvent.click(addButton);

    // Verifica se setItems foi chamado corretamente
    expect(mockSetItems).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: props.id,
          title: props.title,
          price: props.price,
          image: props.image,
          description: props.description,
          quantity: 1,
        }),
      ])
    );

    // Verifica se notificou corretamente
    expect(mockNotify).toHaveBeenCalledWith('Item adicionado no carrinho', { type: 'success' });
  });


  it('should apply dark mode styles when isDarkMode is true', () => {
    // Mock para retornar que o modo escuro está ativado
    (useTheme as jest.Mock).mockReturnValue({
      isDarkMode: true,
    });

    // Renderiza o componente
    render(<Card {...props} />);

    // Verifica se o estilo de modo escuro está presente
    expect(screen.getByText(props.title).closest('div')).toHaveClass('bg-zinc-800 text-white');
  });

});
