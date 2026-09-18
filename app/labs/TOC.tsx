import Link from "next/link";

export default function TOC() {
    return (<><div id="wd-TOC">
        <ul>
            <li>
                <Link href="/" id="wd-home-link">
                    Home
                </Link>
            </li>
            <li>
                <Link href="/labs/" id="wd-labs-link">
                    Labs
                </Link>
            </li>
            <li>
                <Link href="/labs/lab1" id="wd-lab1-link">
                    Lab 1
                </Link>
            </li>
            <li>
                <Link href="/labs/lab2" id="wd-lab2-link">
                    Lab 2
                </Link>
            </li>
            <li>
                <Link href="/labs/lab3" id="wd-lab3-link">
                    Lab 3
                </Link>
            </li>
            <li>
                <Link href="/labs/lab4" id="wd-lab4-link">
                    Lab 4
                </Link>
            </li>
            <li>
                <Link href="/labs/lab5" id="wd-lab5-link">
                    Lab 5
                </Link>
            </li>
            <li>
                <Link href="/book/ch1" id="wd-toc-book-link">Chapter 1</Link>
            </li>
            <li>
                <a href="https://webdev-client.vercel.app/book/ch1#sec-1-3-11" id="wd-book-chapter-1">
                    Link to book chapter 1, section 1.3.11
                </a>
            </li>
            <li>
                <Link href="../" id="wd-kambaz-link">
                    Kambaz
                </Link>
            </li>
        </ul>
    </div></>
    )
}