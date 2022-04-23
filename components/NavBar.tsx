export const NavBar = () => {
  const navItems = [
    {
      text: "Get Benefits",
      href: "/",
    },
    {
      text: "Become a partner",
      href: "/",
    },
  ];

  const styles = {
    container: "p-3 max-w-[1400px] w-full mx-auto flex justify-between",
    logo: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl",
    itemsContainer: "flex space-x-4",
    button:
      "inline-flex items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:border-2 hover:border-black hover:bg-white hover:text-black focus:outline-black focus:ring-2 focus:ring-black focus:ring-offset-2",
  };

  const RenderItems = () => {
    return navItems.map((item, index) => (
      <button key={index} className={styles.button}>
        {item.text}
      </button>
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <a href="/">B3NZ</a>
      </h1>
      <div className={styles.itemsContainer}>{RenderItems()}</div>
    </div>
  );
};
