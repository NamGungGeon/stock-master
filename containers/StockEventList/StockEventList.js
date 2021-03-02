import React, { useEffect } from "react";
import { useRouter } from "next/router";
import EmptySafeZone from "../../components/EmptySafeZone/EmptySafeZone";
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
import { Rating } from "@material-ui/lab";
import { beautifyDate } from "../../lib/moment";
import Empty from "../../components/Empty/Empty";
import Pagination from "@material-ui/lab/Pagination";
import { Button, Chip, Divider } from "@material-ui/core";

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
const StockEventList = ({ stockEventList }) => {
  useEffect(() => {
    console.log("stockEventList", stockEventList);
  }, [stockEventList]);
  const router = useRouter();
  return (
    <EmptySafeZone data={stockEventList.results}>
      <TableContainer component={Paper} elevation={0} variant={"outlined"}>
        <Table style={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>종목 이름</h3>
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
            {stockEventList.results.map(event => {
              console.log("event", event);
              return (
                <ExpandableTableRow
                  key={`${event.id}-stockEvent`}
                  colSize={4}
                  moreRow={
                    <div>
                      <Empty />
                      {event.relatives &&
                        event.relatives.results.map(relative => {
                          const { stock } = relative;
                          return (
                            <Chip
                              key={`${event.id}-${stock.id}-relative`}
                              onClick={e => router.push(`/stocks/${stock.id}`)}
                              label={`${stock.name} (${stock.sosok})`}
                              clickable
                              size="small"
                              style={{
                                marginRight: "4px",
                                marginBottom: "4px"
                              }}
                            />
                          );
                        })}
                      <Empty />
                      <Divider light />
                      <MultiLines lines={parseHTML(event.memo)} />
                    </div>
                  }
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
      {stockEventList.total_page > 1 && (
        <div className="flex align center">
          <Pagination
            color={"primary"}
            count={stockEventList.total_page}
            page={parseInt(router.query.page ?? 1)}
            onChange={(e, page) => {
              router.push({
                pathname: ".",
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
  );
};

export default StockEventList;
