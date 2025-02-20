import React from "react";
import { useParams } from "react-router-dom";
import MDXRenderer from "../supabase/MDXRenderer";
import "./MDXPage.css"

const MDXPage = () => {
  const { mdxFile } = useParams(); // Get the MDX file URL from the route

  if (!mdxFile) {
    return <p>Error: No MDX file provided.</p>;
  }

  return (
    <div className="mdx-container">
      <MDXRenderer mdxUrl={decodeURIComponent(mdxFile)} />
    </div>
  );
};

export default MDXPage;
