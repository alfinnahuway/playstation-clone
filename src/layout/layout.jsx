import Header from "../components/header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col gap-10 mb-36">
        <Header />
      </div>
      {children}
    </>
  );
};

export default Layout;
