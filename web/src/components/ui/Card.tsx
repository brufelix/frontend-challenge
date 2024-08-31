import { useTheme } from '~/hooks/use-theme.hook';
import { Card as CardNextUi, CardBody, CardFooter, cn, Button } from '@nextui-org/react';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { toCurrency } from '~/utils/to-currency.util';

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const Card = ({ description, price, title, image }: Props) => {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatação do preço
  const formattedPrice = toCurrency(price);

  // Truncar a descrição para mostrar no máximo 4 linhas
  const toggleDescription = () => setIsExpanded(!isExpanded);
  const descriptionText = isExpanded ? description : description.substring(0, 100) + (description.length > 100 ? '...' : '');

  return (
    <CardNextUi className="transform transition-transform duration-400 hover:-translate-y-2 border-none rounded-md shadow-lg">
      <div className="w-full h-48 overflow-hidden rounded-t-md">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardBody className={cn('p-4 space-y-2', isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black')}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">
          {descriptionText}
          {description.length > 100 && (
            <button onClick={toggleDescription} className="text-blue-500 ml-1">
              {isExpanded ? 'Ver menos' : 'Ver mais'}
            </button>
          )}
        </p>
        <h1 className="font-semibold text-xl">{formattedPrice}</h1>
      </CardBody>
      <CardFooter className={cn('p-4', isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100')}>
        <Button startContent={<ShoppingBag />} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </CardNextUi>
  );
};
