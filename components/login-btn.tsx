import { signIn } from "@/auth"

export function LoginBtn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("keycloak", { redirectTo: "/dashboard" })
            }}
        >
            <button type="submit">Sign in</button>
        </form>
    )
}