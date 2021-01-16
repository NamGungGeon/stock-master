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
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Empty from "../../components/Empty/Empty";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";
import { useInput } from "../../hooks";

const styles = {
  table: {
    minWidth: "512px",
  },
  tableRow: {
    cursor: "pointer",
  },
  form: {
    width: "100%",
    textAlign: "center",
    alignItems: "flex-end",
  },
  formLine: {
    maxWidth: "350px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    flex: "1",
  },
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein, id: Math.random() * 30 };
}

const _rows = [
  createData("정치주", 159, 6.0, 24, "2020-01-01"),
  createData("제약주", 237, 9.0, 37, "2020-01-13"),
  createData("폐기물주", 262, 16.0, 24, "2021-03-11"),
  createData("폐기물주1", 262, 16.0, 24, "2021-03-11"),
  createData("폐기물주2", 262, 16.0, 24, "2021-03-11"),
  createData("폐기물주43", 262, 16.0, 24, "2021-03-11"),
  createData("폐기물주4", 262, 16.0, 24, "2021-03-11"),
  createData("폐기물주5", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주1", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주2", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주3", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주4", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주5", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주6", 262, 16.0, 24, "2021-03-11"),
  createData("북딱주7", 262, 16.0, 24, "2021-03-11"),
];

const theme = ({ className, rows }) => {
  const [overview, setOverview] = useState();
  const router = useRouter();
  const [input, handleInput] = useInput({
    search: "",
  });
  useEffect(() => {
    console.log(router);
  }, [router]);

  return (
    <div className={className}>
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
            onClick={(e) => {
              router.push({
                pathname: "/theme",
                query: {
                  ...router.query,
                  page: 1,
                  ...input,
                },
              });
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </FormControl>
      <Empty />
      <TableContainer component={Paper}>
        <Table style={styles.table} size="small" aria-label="a dense table">
          {rows.length ? (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h3>테마 이름</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>생성일자</h3>
                  </TableCell>
                  <TableCell align="right">
                    <h3>옵션</h3>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      style={styles.tableRow}
                      onClick={(e) => {
                        if (overview && row.id === overview.id) setOverview(null);
                        else
                          setOverview({
                            id: row.id,
                          });
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      <TableCell
                        align="right"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/theme/${row.id}`);
                        }}
                      >
                        <ArrowForwardIcon />
                      </TableCell>
                    </TableRow>
                    {overview && overview.id === row.id && (
                      <TableRow>
                        <TableCell colSpan={3}>
                          상세정보 <br />
                          상세정보 <br />
                          상세정보 <br />
                          상세정보 <br />
                          상세정보 <br />
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </>
          ) : (
            <TableRow>
              <TableCell colspan="3">
                <div className="flex align center" style={{ height: "128px" }}>
                  <p className="explain">찾으시는 종목이 없습니다</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
      <Empty size={"large"} />
      {!!rows.length && (
        <div className={"flex align center"}>
          <Pagination
            color={"primary"}
            count={11}
            page={parseInt(router.query.page ?? 1)}
            onChange={(e, page) => {
              router.push({
                pathname: `./theme`,
                query: {
                  ...router.query,
                  ...input,
                  page,
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  console.log(context.query);

  const rows = _rows.sort(() => Math.random() - 0.5);
  return {
    props: {
      rows,
    }, // will be passed to the page component as props
  };
}
export default theme;
