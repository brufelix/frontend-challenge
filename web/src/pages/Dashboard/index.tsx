import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";
import { getProductQuery, queryKeys } from "~/common/queries";
import { Card } from "~/components/ui/Card";
import { useBasket } from "~/hooks/use-basket.hook";
import { useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const DashboardPage = () => {
  const { items } = useBasket();

  // Obtendo listagens de produtos
  const productsQuery = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [queryKeys.list],
    queryFn: getProductQuery,
  });

  // removendo os produtos que já existem no carrinho de compras 
  const availableProducts = useMemo(() => {
    return (productsQuery.data || []).filter(p => !items.find(basketItem => basketItem.id === p.id));
  }, [productsQuery.data, items]);

  if (productsQuery.isFetching || productsQuery.isLoading || productsQuery.isPending) {
    return (
      <div className="flex items-center justify-center p-16">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <TransitionGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {availableProducts.map(product => (
        <CSSTransition key={product.id} timeout={300} classNames="fade">
          <Card {...product} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
