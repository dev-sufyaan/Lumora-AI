import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
    // Simply redirect to the app page without authentication
    redirect("/app");
};

export default AuthCallbackPage
