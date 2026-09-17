import Link from "next/link";

export default function TOC() {
    return (<><div id="wd-TOC">
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/labs/lab1">Lab 1</Link>
            </li>
            <li>
                <Link href="/labs/lab2">Lab 2</Link>
            </li>
            <li>
                <Link href="/labs/lab3">Lab 3</Link>
            </li>
            <li>
                <Link href="/labs/lab4">Lab 4</Link>
            </li>
            <li>
                <Link href="/labs/lab5">Lab 5</Link>
            </li>
            <li>
                <Link href="/book/ch1" id="wd-toc-book-link">Chapter 1</Link>
            </li>
            <li>
                <a href="https://webdev-client.vercel.app/book/ch1#sec-1-3-11" id="wd-book-chapter-1">
                    Link to book chapter 1, section 1.3.11
                </a>
            </li>
        </ul>
    </div></>
    )
}