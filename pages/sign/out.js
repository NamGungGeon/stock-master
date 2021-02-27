import React, { useEffect } from "react";
import { applySession } from "next-session";
import { useRouter } from "next/router";
import auth from "../../observables/auth";

const out = () => {
  const router = useRouter();
  useEffect(() => {
    alert("로그아웃 되었습니다");
    router.replace("/sign/in");
  }, []);
  return <div></div>;
};

export const getServerSideProps = async function({ req, res }) {
  await applySession(req, res);
  req.session?.destroy();
  auth.remove();

  return {
    props: {}
  };
};

export default out;
