import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";
import { Card } from "~/components/ui/Card";
import { getProductQuery, queryKeys } from "~/common/queries";

export const DashboardPage = () => {

  const products = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [queryKeys.list],
    queryFn: getProductQuery,
  });

  if (products.isFetching || products.isLoading || products.isPending) {
    return (
      <div className="flex items-center justify-center p-16">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {(products.data || []).map(product => (
        <Card {...product} />
      ))}
    </div>
  );
};
