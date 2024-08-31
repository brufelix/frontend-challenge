import { Pagination, SelectItem } from "@nextui-org/react";
import { registersByPage } from "~/data/registers-by-page";
import { SelectCustom } from "./Select";

export type TPageProps = {
  page?: number;
  perPage: number;
  // Pagination frontend response backend
  totalPages?: number;
  totalItems?: number;
};

interface IPaginationProps {
  // Pagination
  pageProps: TPageProps;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export function PaginationDefault({
  pageProps,
  setPage,
  setItemsPerPage,
}: IPaginationProps) {
  return (
    <div className="grid grid-cols-5 w-full items-center">
      <div className="grid grid-cols-subgrid  col-span-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          aria-label="Paginação"
          page={pageProps.page}
          total={pageProps.totalPages || 0}
          onChange={(selectedPage) => setPage(selectedPage)}
          className="col-end-4"
        />
      </div>
      <div className="grid grid-cols-subgrid gap-4 col-span-1">
        <SelectCustom
          size="sm"
          variant="bordered"
          label="Registros por página"
          aria-label="selecionar quantidade de intens por pagina"
          selectedKeys={[pageProps.perPage.toString()]}
          classNames={{
            base: "w-16 flex justify-end",
            listboxWrapper: "w-full",
          }}
          listboxProps={{
            itemClasses: {
              base: "text-center data-[selectable=true]:focus:bg-primary-400",
              selectedIcon: "hidden",
            },
          }}
          onChange={(e) => {
            setPage(1);
            setItemsPerPage(Number(e.target.value));
          }}
          className="w-40 col-end-5"
        >
          {registersByPage.map((options) => (
            <SelectItem
              key={options.value}
              value={options.value}
              textValue={options.label.toString()}
            >
              {options.label}
            </SelectItem>
          ))}
        </SelectCustom>
      </div>
    </div>
  );
}
