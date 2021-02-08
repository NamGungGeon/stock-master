import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ExpandableTableRow from "../../components/ExpandableTableRow/ExpandableTableRow";
import MultiLines from "../../components/MultiLines/MultiLines";
import { parseHTML } from "../../lib/markup";
import Empty from "../../components/Empty/Empty";
import { Button } from "@material-ui/core";
import { beautifyDate } from "../../lib/moment";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useRouter } from "next/router";
import EmptySafeZone from "../../components/EmptySafeZone/EmptySafeZone";
import Pagination from "@material-ui/lab/Pagination";

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

const StockList = ({ stockList }) => {
  const router = useRouter();
  return (
    <div>
      <EmptySafeZone
        data={stockList.results}
        renderWhenEmpty={() => (
          <p className={"align center explain"}>찾으시는 종목이 없습니다</p>
        )}
      >
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table style={styles.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>종목 이름</h3>
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
              {stockList.results.map(stock => {
                /* "id": 1,
                  "name": "삼성전자",
                  "code": 5930,
                  "sosok": "코스피",
                  "is_end": false,
                  "created_date": "2021-01-13T09:50:18.945306",
                  "destroy_date": null,
                  "memo": ""*/
                return (
                  <ExpandableTableRow
                    moreRow={
                      <>
                        <MultiLines lines={parseHTML(stock.memo)} />
                        <Empty />
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={e => router.push(`/stocks/${stock.id}`)}
                        >
                          자세히
                        </Button>
                      </>
                    }
                    colSize={3}
                  >
                    <TableCell component="th" scope="row">
                      {stock.name}
                    </TableCell>
                    <TableCell align="right">
                      {beautifyDate(stock.created_date)}
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={e => {
                        e.stopPropagation();
                        router.push(`/stocks/${stock.id}`);
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

        {stockList.total_pages > 1 && (
          <div className={"flex align center"}>
            <Pagination
              color={"primary"}
              count={stockList.total_pages}
              page={parseInt(router.query.page ?? 1)}
              onChange={(e, page) => {
                router.push({
                  pathname: `/stocks`,
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
    </div>
  );
};

export default StockList;
