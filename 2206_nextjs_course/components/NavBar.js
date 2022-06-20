import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../components/NavBar.module.css"

export default function NavBar() {
    const router = useRouter();

    return (
    <nav>      
        <Link href="/" >
            <a className={
                `${ styles.link } 
                ${ router.pathname === "/" ? styles.active : "" }` 
                }>Home</a>
        </Link>
        <Link href="/about">
            <a className={[ 
                styles.link,
                router.pathname === "/about" ? styles.active : "" 
            ].join(" ")
        }>About</a>
        </Link>
        {/* 클래스 2개를 한꺼번에 쓰기 위한 방법 */}
    </nav>
    );
}
