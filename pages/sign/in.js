import React, { useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PageMeta from "../../components/PageMeta/PageMeta";
import Empty from "../../components/Empty/Empty";
import { useInput } from "../../hooks";
import { Button, FormGroup } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import parse from "urlencoded-body-parser";
import MainLayout from "../../layout/MainLayout";
import { isError } from "../../lib";
import { SessionAuth } from "../../lib/serverSideAuth";
import { login } from "../../http";

const styles = {
  form: {
    maxWidth: "512px",
    width: "100%"
  }
};

const signin = ({ message }) => {
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
    <MainLayout
      style={{
        maxWidth: "320px"
      }}
    >
      <PageMeta
        title="로그인"
        description="사이트를 이용하시라면 로그인하세요"
      />
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
    </MainLayout>
  );
};

export const getServerSideProps = async function({ req, res }) {
  console.log("page");
  const { auth: sessionAuth } = req.session;
  const requestLogin = async () => {
    const { id, pw } = await parse(req);
    if (!id || !pw) {
      throw "아이디와 비밀번호를 모두 입력하세요";
    }
    const tokens = await login(id, pw)
      .then(res => {
        return res.data;
      })
      .catch(e => e);
    if (isError(tokens, "login")) {
      throw "아이디와 비밀번호가 일치하지 않습니다";
    }
    return tokens;
  };

  if (req.method === "POST") {
    return await requestLogin()
      .then(tokens => {
        req.session.auth = new SessionAuth(tokens.access, tokens.refresh);
        return {
          redirect: {
            destination: "/",
            permanent: true
          }
        };
      })
      .catch(e => {
        return {
          props: {
            message: e.toString()
          }
        };
      });
  } else {
    if (sessionAuth.filled()) {
      return {
        redirect: {
          destination: "/",
          permanent: true
        }
      };
    }

    return {
      props: {}
    };
  }
};

export default signin;
