import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants/index";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeBuddy" },
    { name: "description", content: "Your favourite resume analyzer" },
  ];
}

export default function Home() {

  //now writing the same navigation methods which we wrote in auth.tsx.
  //if user is not authenticated, then redirect it to the login page and pass this pages address so that after loging in the user can come backe to this page instead of going to any default page.

  const {auth} = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  },[auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar></Navbar>

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume}></ResumeCard>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
