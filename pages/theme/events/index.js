import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Box, Collapse, IconButton, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TimelineIcon from "@material-ui/icons/Timeline";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";
import { toJS } from "mobx";
import MainLayout from "../../../layout/MainLayout";
import PageMeta from "../../../components/PageMeta/PageMeta";
import Empty from "../../../components/Empty/Empty";
import auth from "../../../observables/auth";
import { withAuth } from "../../../hoc/withAuth";

const styles = {
  table: {
    minWidth: "512px"
  },
  tableRow: {
    cursor: "pointer"
  },
  form: {
    width: "100%",
    textAlign: "center",
    alignItems: "flex-end"
  },
  formLine: {
    maxWidth: "350px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formInput: {
    flex: "1"
  }
};

const Searcher = () => {
  return (
    <form action="/theme/event" method="GET">
      <FormControl style={styles.form}>
        <div style={styles.formLine}>
          <TextField
            id="startDate"
            name="startDate"
            label="시작 날짜"
            type="date"
            defaultValue="2020-01-01"
            style={styles.formInput}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="endDate"
            name="endDate"
            label="종료 날짜"
            type="date"
            defaultValue="2020-03-31"
            style={styles.formInput}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div style={styles.formLine}>
          <Input
            name={"search"}
            style={styles.formInput}
            placeholder={"검색할 테마명을 입력하세요"}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <TimelineIcon />
              </InputAdornment>
            }
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </div>
      </FormControl>
    </form>
  );
};
const events = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <PageMeta title="테마 일정" />
      <Empty size="large" />
      <Searcher />
      <Empty />
      <TableContainer component={Paper} elevation={0} variant={"outlined"}>
        <Table style={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>테마 이름</h3>
              </TableCell>
              <TableCell align="right">
                <h3>관련 테마</h3>
              </TableCell>
              <TableCell align="right">
                <h3>날짜</h3>
              </TableCell>
              <TableCell align="right">
                <h3>중요도</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={styles.tableRow}>
              <TableCell component="th" scope="row">
                테마이름
              </TableCell>
              <TableCell align="right">건설주</TableCell>
              <TableCell align="right">2020-01-01</TableCell>
              <TableCell align="right">별이다섯개</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Empty size={"large"} />
      <div className="flex align center">
        <Pagination
          color={"primary"}
          count={10}
          page={parseInt(router.query.page ?? 1)}
          onChange={(e, page) => {
            router.push({
              pathname: `/theme/event`,
              query: {
                ...router.query,
                page
              }
            });
          }}
        />
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  if (!auth.isLogined)
    return {
      redirect: {
        destination: "/sign/in",
        permanent: true
      }
    };

  return {
    props: {
      auth: toJS(auth)
    } // will be passed to the page component as props
  };
}

export default withAuth(events);
