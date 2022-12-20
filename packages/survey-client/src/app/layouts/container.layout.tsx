const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className="container mx-auto p-7">{children}</div>;
};

export default Container;
