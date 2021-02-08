import React, { useEffect, useState } from "react";
import PageMeta from "../../components/PageMeta/PageMeta";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TimelineIcon from "@material-ui/icons/Timeline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Box, Button, Collapse, IconButton, Tooltip } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Empty from "../../components/Empty/Empty";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";
import { useInput } from "../../hooks";

import { getThemeList } from "../../http";
import MainLayout from "../../layout/MainLayout";
import auth from "../../observables/auth";
import { toJS } from "mobx";
import { withAuth } from "../../hoc/withAuth";
import { parseHTML } from "../../lib/markup";
import MultiLines from "../../components/MultiLines/MultiLines";
import { beautifyDate } from "../../lib/moment";
import ExpandableTableRow from "../../components/ExpandableTableRow/ExpandableTableRow";
import EmptySafeZone from "../../components/EmptySafeZone/EmptySafeZone";

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

const theme = ({ className, query, themeList }) => {
  const router = useRouter();
  const [input, handleInput, setInput] = useInput({
    search: ""
  });
  useEffect(() => {
    if (query && query.search)
      setInput({
        search: query.search
      });
  }, [query]);
  return (
    <MainLayout className={className}>
      <PageMeta title={"테마 정보"} description={"테마 정보"} />
      <FormControl style={styles.form}>
        <div style={styles.formLine}>
          <Input
            value={input.search}
            onChange={handleInput}
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
          <IconButton
            onClick={e => {
              router.push({
                pathname: "/theme",
                query: {
                  ...router.query,
                  page: 1,
                  ...input
                }
              });
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </FormControl>
      <Empty />
      <EmptySafeZone
        data={themeList.results}
        renderWhenEmpty={() => (
          <div>
            <Empty />
            <p className={"align center explain"}>찾으시는 종목이 없습니다</p>
          </div>
        )}
      >
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table style={styles.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>테마 이름</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>생성일자</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>자세히</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {themeList.results.map(theme => {
                return (
                  <ExpandableTableRow
                    moreRow={
                      <>
                        <MultiLines lines={parseHTML(theme.memo)} />
                        <Empty />
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={e => router.push(`/theme/${theme.id}`)}
                        >
                          자세히
                        </Button>
                      </>
                    }
                    colSize={3}
                  >
                    <TableCell component="th" scope="row">
                      {theme.name}
                    </TableCell>
                    <TableCell align="right">
                      {beautifyDate(theme.created_date)}
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={e => {
                        e.stopPropagation();
                        router.push(`/theme/${theme.id}`);
                      }}
                    >
                      <ArrowForwardIcon />
                    </TableCell>
                  </ExpandableTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Empty size={"large"} />
        {themeList.total_pages > 1 && (
          <div className={"flex align center"}>
            <Pagination
              color={"primary"}
              count={themeList.total_pages}
              page={parseInt(router.query.page ?? 1)}
              onChange={(e, page) => {
                router.push({
                  pathname: `./theme`,
                  query: {
                    ...router.query,
                    ...input,
                    page
                  }
                });
              }}
            />
          </div>
        )}
      </EmptySafeZone>
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

  const { page = 1, search } = query;

  const themeList = await getThemeList({ page, name: search })
    .then(res => res.data)
    .catch(e => e);
  console.log(themeList);

  console.log(query);
  return {
    props: {
      themeList,
      auth: toJS(auth),
      query
    } // will be passed to the page component as props
  };
}
export default withAuth(theme);
