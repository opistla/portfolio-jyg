const Label = (props) => {
  const { label } = props;
  return (
    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
      {label}
    </span>
  );
};

export default Label;
