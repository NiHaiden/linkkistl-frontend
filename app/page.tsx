import Link from "next/link";

export default async function Home() {
    return (
        <div>Welcome to Linkkistl.
            <span><Link href={"/login"}>Login here</Link></span>
        </div>
    )
}
