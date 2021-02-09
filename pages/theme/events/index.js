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
import DateRangeSearcher from "../../../components/Searcher/DateRangeSearcher";
import { useInput } from "../../../hooks";
import TextSearcher from "../../../components/Searcher/TextSearcher";
import { getAxiosResult, getThemeEventList } from "../../../http";
import { isError } from "../../../lib";
import EmptySafeZone from "../../../components/EmptySafeZone/EmptySafeZone";
import { beautifyDate } from "../../../lib/moment";
import MultiLines from "../../../components/MultiLines/MultiLines";
import { parseHTML } from "../../../lib/markup";
import ExpandableTableRow from "../../../components/ExpandableTableRow/ExpandableTableRow";
import { Rating } from "@material-ui/lab";

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
  const [input, handleInput] = useInput({
    startDate: null,
    endDate: null,
    search: null
  });
  const router = useRouter();
  return (
    <form action="/theme/events" method="GET">
      <input name={"page"} value={router.query.page ?? 1} hidden={true} />
      <DateRangeSearcher range={input} handleRange={handleInput} />
      <TextSearcher
        placeholder={'검색할 테마명을 입력하세요'}
        search={input.search}
        handleSearch={handleInput}
        submit={() => {}}
      />
    </form>
  );
};
const events = ({ themeEventList }) => {
  const router = useRouter();
  return (
    <MainLayout>
      <PageMeta title="테마 일정" />
      <Empty size="large" />
      <Searcher />
      <Empty />
      <EmptySafeZone data={themeEventList.results}>
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table style={styles.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>테마 이름</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>중요도</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>날짜</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {themeEventList.results.map(event => {
                return (
                  <ExpandableTableRow
                    colSize={3}
                    moreRow={<MultiLines lines={parseHTML(event.memo)} />}
                  >
                    <TableCell>{event.name}</TableCell>
                    <TableCell align="right">
                      <Rating readOnly value={event.importance} />
                    </TableCell>
                    <TableCell align="right">
                      {beautifyDate(event.target_date)}
                      <br />~{beautifyDate(event.target_end_date)}
                    </TableCell>
                  </ExpandableTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Empty size={"large"} />
        {themeEventList.total_page > 1 && (
          <div className="flex align center">
            <Pagination
              color={"primary"}
              count={themeEventList.total_page}
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
  const { search, startDate, endDate, page } = query;
  const themeEventList = await getAxiosResult(
    getThemeEventList({
      page,
      name: search,
      target_date: startDate,
      target_end_date: endDate
    })
  );
  isError(themeEventList, "themeEventList");

  return {
    props: {
      auth: toJS(auth),
      themeEventList
    } // will be passed to the page component as props
  };
}

export default withAuth(events);
