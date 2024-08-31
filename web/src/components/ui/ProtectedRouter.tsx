import { Layout } from "../structures/Layout";

type ProtectedRouterProps = {
  children: React.ReactNode;
};

export const ProtectedRouter = ({
  children,
}: ProtectedRouterProps) => {
  return (
    <Layout>{children}</Layout>
  );
};
