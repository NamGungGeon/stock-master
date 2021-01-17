import React from "react";
import PageMeta from "../components/PageMeta/PageMeta";
import Empty from "../components/Empty/Empty";
import auth from "../observables/auth";
import MainLayout from "../layout/MainLayout";
import { toJS } from "mobx";
import { withAuth } from "../hoc/withAuth";

function Home({ className }) {
  return (
    <MainLayout className={className}>
      <PageMeta title="임시 홈" description="" />
      <Empty size="large" />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </MainLayout>
  );
}
export default withAuth(Home);

export const getServerSideProps = async function({ req, res }) {
  if (!auth.isLogined)
    return {
      redirect: {
        destination: "/sign/in",
        permanent: false,
      },
    };

  return {
    props: {
      auth: toJS(auth),
    },
  };
};
