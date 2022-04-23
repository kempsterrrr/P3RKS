import { FaTwitter } from "react-icons/fa";

export const Footer = () => {
  const styles = {
    container: "h-20 max-w-[1400px] w-full mx-auto flex justify-between",
    text: "text-gray-400",
    icon: "w-6 h-6 text-gray-400 hover:text-gray-500",
  };

  return (
    <footer className={styles.container}>
      <p className={styles.text}>benz</p>
      <a href="https://twitter.com/getb3nz" target="_blank">
        <span className="sr-only">Twitter</span>
        <FaTwitter className={styles.icon} aria-hidden="true" />
      </a>
    </footer>
  );
};

