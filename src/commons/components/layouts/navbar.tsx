import { NAVIGATIONS } from "@/commons/constants";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Social.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div className="container py-4">
      <header className="d-flex flex-wrap justify-content-between">
        {/* Redirect to create new social page since this is one page app */}
        <Link href="/socials/create-new">
          <Image
            src="/assets/images/logo.svg"
            alt="Supermomos logo"
            width={200}
            height={36}
            priority
          />
        </Link>

        <ul className="nav">
          {NAVIGATIONS.map(({ url, text, children }) => {
            if (!children) {
              return (
                <li key={url} className="nav-item">
                  <Link href={url} className={styles.link}>
                    {text}
                  </Link>
                </li>
              );
            }

            return (
              <li key={url} className="nav-item">
                <Link href={url} className={styles.link}>
                  {text}
                </Link>
                <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}
