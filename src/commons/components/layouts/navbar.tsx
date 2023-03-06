import { NAVIGATIONS } from "@/commons/constants";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/assets/images/logo.svg";

export default function NavBar() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-between">
        {/* Redirect to create new social page since this is one page app */}
        <Link href="/socials/create-new">
          <Image src={logo} alt="Supermomos logo" />
        </Link>

        <ul className="nav">
          {NAVIGATIONS.map(({ url, text, children }) => {
            if (!children) {
              return (
                <li className="nav-item">
                  <Link href={url}>{text}</Link>
                </li>
              );
            }
          })}
        </ul>
      </header>
    </div>
  );
}
