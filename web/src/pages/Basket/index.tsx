import React from 'react';
import { useTheme } from '~/hooks/use-theme.hook';
import { Button, cn } from '@nextui-org/react';
import { Trash, Plus, Minus } from 'lucide-react';
import { toCurrency } from '~/utils/to-currency.util';
import { useBasket } from '~/hooks/use-basket.hook';
import { useNavigate } from 'react-router-dom';
import { URLS } from '~/constants/urls';
import { notify } from '~/utils/notify.util';

export const BasketPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { setItems, items } = useBasket();

  // Calcula o total do carrinho
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleIncrement = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(newItems);
  };

  const handleDecrement = (id: number) => {
    const newItems = items.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setItems(newItems.filter(item => item.quantity > 0));
  };

  const handleRemoveAll = () => {
    setItems([]); // Remove todos os itens do carrinho
  };

  const handleFinish = () => {
    notify('Compra finalizada com sucesso!', { type: 'success' });
    setItems([]);
    navigate(URLS.dashboard);
  }

  return (
    <div className={cn('p-6 shadow-md rounded-lg', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black')}>
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {items.length === 0 ? (
        <p className="text-lg">Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id} className={cn('flex items-center justify-between p-4 mb-4 shadow-lg rounded-md', isDarkMode ? 'bg-gray-900 text-white' : 'bg-zinc-100 text-black')}>
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-grow px-4">
                  <h2 className="font-semibold">{item.title}</h2>
                  <div className="flex items-center space-x-2">
                    <Button isIconOnly onClick={() => handleDecrement(item.id)} aria-label='decrement-item'>
                      <Minus size={15} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button isIconOnly onClick={() => handleIncrement(item.id)} aria-label='increment-item'>
                      <Plus size={15} />
                    </Button>
                  </div>
                  <p className="font-semibold">{toCurrency(item.price * item.quantity)}</p>
                </div>
                <Button size="sm" color="warning" onClick={() => handleRemove(item.id)} startContent={<Trash />}>
                  Remover
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <Button color="danger" onClick={handleRemoveAll} className="bg-red-500 hover:bg-red-600">
              Remover Todos
            </Button>
            <h2 className="text-xl font-bold">Total: {toCurrency(total)}</h2>
          </div>

          <Button onClick={() => handleFinish()} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white">
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  );
};
