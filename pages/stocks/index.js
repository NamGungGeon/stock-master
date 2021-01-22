import { toJS } from "mobx";
import React from "react";
import PageMeta from "../../components/PageMeta/PageMeta";
import { withAuth } from "../../hoc/withAuth";
import MainLayout from "../../layout/MainLayout";
import auth from "../../observables/auth";

const index = () => {
  return (
    <MainLayout>
      <PageMeta title="종목 정리" description="종목 정리" />
    </MainLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  if (!auth.isLogined)
    return {
      redirect: {
        destination: "/sign/in",
        permanent: true,
      },
    };

  return {
    props: {
      auth: toJS(auth),
    }, // will be passed to the page component as props
  };
}
export default withAuth(index);
