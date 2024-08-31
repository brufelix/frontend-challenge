interface Props {
  field?: string;
  errors: Record<string, any>;
}

export const ErrorMessage = ({ errors, field }: Props) => {
  if (!field || !errors[field] || !errors[field].message) return null;
  return <p className="text-red-700 text-sm p-1">{errors[field].message}</p>;
};
