import React, { useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PageMeta from "../../components/PageMeta/PageMeta";
import Empty from "../../components/Empty/Empty";
import { useInput } from "../../hooks";
import { Button, ButtonGroup, FormGroup } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { login } from "../../http";
import { applySession } from "next-session";
import parse from "urlencoded-body-parser";

const styles = {
  form: {
    maxWidth: "512px",
    width: "100%",
  },
};

const signin = ({ className, message }) => {
  const [input, handleInput] = useInput({ id: "", pw: "" });
  useEffect(() => {
    if (message) alert(message);
  }, []);

  const tryLogin = () => {
    const { id, pw } = input;
    if (!id || !pw) {
      alert("아이디와 비밀번호를 모두 입력하세요");
      return;
    }
  };

  return (
    <div
      className={className}
      style={{
        maxWidth: "320px",
      }}
    >
      <PageMeta title="로그인" description="사이트를 이용하시라면 로그인하세요" />
      <Empty size="large" />
      <form action="/sign/in" method="POST">
        <FormGroup style={styles.form}>
          <FormControl>
            <InputLabel htmlFor="id">아이디</InputLabel>
            <Input
              value={input.id}
              onChange={handleInput}
              id="id"
              name="id"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <Empty />
          <FormControl>
            <InputLabel htmlFor="pw">비밀번호</InputLabel>
            <Input
              value={input.pw}
              onChange={handleInput}
              id="pw"
              name="pw"
              type="password"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Empty size="large" />
          <FormControl>
            <Button type="submit" color="primary" onClick={tryLogin}>
              로그인
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </div>
  );
};

export const getServerSideProps = async function({ req, res }) {
  await applySession(req, res);
  console.log(req.session);

  if (req.method === "POST") {
    const { id, pw } = await parse(req);
    console.log(id, pw);
    if (!id || !pw) {
      return {
        redirect: {
          destination: "/sign/in",
          permanent: false,
        },
      };
    }

    const auth = await login(id, pw)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        if (e.response) console.error(e.response.status, e.response.data);
        else console.error(e);

        return null;
      });

    if (auth) {
      req.session.auth = auth;
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        message: "아이디와 비밀번호를 다시 확인하세요",
      },
    };
  } else {
    // Get the user's session based on the request
    const auth = req.session.auth;

    if (auth)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    return {
      props: {},
    };
  }
};

export default signin;