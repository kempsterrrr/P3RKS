import Link from "next/link";

export const NavBar = () => {
  const navItems = [
    {
      text: "Get Benefits",
      href: "/benefits",
    },
    {
      text: "Become a partner",
      href: "/",
    },
  ];

  const styles = {
    container: "p-3 max-w-[1400px] w-full mx-auto flex justify-between",
    logo: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl",
    itemsDesktopContainer: "hidden flex space-x-4 sm:flex",
    button:
      "inline-flex items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:border-2 hover:border-black hover:bg-white hover:text-black focus:outline-black focus:ring-2 focus:ring-black focus:ring-offset-2",
  };

  const RenderItems = () => {
    return navItems.map((item, index) => (
      <Link key={index} href={item.href}>
        <a className={styles.button}>{item.text}</a>
      </Link>
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <Link href="/">
          <a>B3NZ</a>
        </Link>
      </h1>
      <div className={styles.itemsDesktopContainer}>{RenderItems()}</div>
    </div>
  );
};
