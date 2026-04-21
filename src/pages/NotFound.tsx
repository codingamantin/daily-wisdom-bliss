import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { uiContent } from "@/data/ui-content";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold">{uiContent.notFound.title}</h1>
        <p className="mb-4 text-2xl text-muted-foreground">{uiContent.notFound.body}</p>
        <a href="/" className="text-lg text-primary underline hover:text-primary/90">
          {uiContent.notFound.backHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
