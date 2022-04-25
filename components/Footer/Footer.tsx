import Link from "next/link";
import { FaTwitter } from "react-icons/fa";

const styles = {
  container:
    "p-[20px] max-w-[1400px] w-full mx-auto space-x-4 flex justify-center sm:justify-between",
  text: "text-gray-400",
  icon: "w-6 h-6 text-gray-400 hover:text-gray-500",
};

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>benz</p>
      <Link href="https://twitter.com/getb3nz">
        <a>
          <span className="sr-only">Twitter</span>
          <FaTwitter className={styles.icon} aria-hidden="true" />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
