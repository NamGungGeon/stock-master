import React, { useEffect } from "react";
import Head from "next/head";
import pagemeta from "../../observables/pagemeta";

const PageMeta = ({ title = "", description = "", displayHTML = true }) => {
  useEffect(() => {
    pagemeta.update(title, description);
  }, [title, description]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      {displayHTML && (
        <div>
          <h1 style={{ marginBottom: 0 }}>{title}</h1>
          <p className={"explain"}>{description}</p>
        </div>
      )}
    </>
  );
};

export default PageMeta;
