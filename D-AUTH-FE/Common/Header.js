import { ConnectButton } from "web3uikit";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <div className="border-4 border-orange-500 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a
              href="/"
              className={`${styles["header-link"]} text-white text-4xl font-bold`}
            >
              D-Auth
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="/verify"
              className={`${styles["about-link"]} text-white mr-4 hover:underline transition duration-200`}
              style={{ marginRight: "0.5cm" }}
            >
              Verify
            </a>
            <a
              href="/about"
              className={`${styles["about-link"]} text-white mr-8 hover:underline transition duration-200`}
              style={{ marginRight: "0.5cm" }}
            >
              About Us
            </a>

            <div className="py-2 px-4">
              <ConnectButton
                moralisAuth={false}
                className="text-white font-bold bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
