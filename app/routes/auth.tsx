import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter"

//define the meta data which will be shown when this page loads.
export const meta = () => ([
    { title: 'ResumeBuddy | Auth' },
    { name: 'description', content: 'Log into your account' },
])



const auth = () => {

    //getting the isloading and auth state from the global auth context which is provided in putter zustand store.
    const {isLoading, auth} = usePuterStore();
    //to redirect user after login to the page which he wanted to acces but can't because he is not logged in.
    //we are not redirectiong to homepage but the page from which the user came to this page.

    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
  )
}

export default auth