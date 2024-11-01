import {LoginBtn} from "@/components/login-btn";
import {ModeToggle} from "@/components/dark-mode-toggle";

export default function Login() {
    return (
        <main className={"h-[100dvh] dark:bg-gray-800"}>
            <ModeToggle/>
            <LoginBtn/>
        </main>
    )
}