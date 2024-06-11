import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";
import Button from "@/src/components/Button/Button";
import { isMobileDevice } from "@/src/utils/isMobileDevice";
import logoIcon from "@/public/svgs/logo.svg";
import mobileLogoIcon from "@/public/svgs/logo-mobile.svg";

const isMobile = typeof window !== "undefined" && isMobileDevice();

export default function Header() {
  const router = useRouter();
  const setCurrentPage = (path: string) => {
    return {
      color:
        typeof window !== "undefined" && window.location.pathname === path
          ? "#3692ff"
          : "#4b5563",
    };
  };

  return (
    <header className={styles.container}>
      <div className={styles.headerLeft}>
        <Link href="/" passHref>
          <Image
            src={isMobile ? mobileLogoIcon : logoIcon}
            alt="판다마켓 로고"
            width={154}
            height={50}
          />
        </Link>

        <nav className={styles.navContainer}>
          <Link href="/boards" style={setCurrentPage("/boards")}>
            자유게시판
          </Link>
          <Link href="/items" style={setCurrentPage("/items")}>
            중고마켓
          </Link>
        </nav>
      </div>
      <Button onClick={() => router.push("/signin")}> 로그인</Button>
    </header>
  );
}
