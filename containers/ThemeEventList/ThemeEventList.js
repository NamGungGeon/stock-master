import React, { useEffect } from "react";
import Empty from "../../components/Empty/Empty";
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
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";
import { Chip } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

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

const ThemeEventList = ({ themeEventList }) => {
  const router = useRouter();
  useEffect(() => {
    console.log("themeEventList", themeEventList);
  }, [themeEventList]);
  return (
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
                  key={`${event.id}-tEvent`}
                  moreRow={
                    <div>
                      <Empty />
                      {event.relatives &&
                        event.relatives.results.map(relative => {
                          const { theme } = relative;
                          return (
                            <Tooltip title={parseHTML(theme.memo)}>
                              <Chip
                                key={`${event.id}-${theme.id}-rTheme`}
                                onClick={e => router.push(`/theme/${theme.id}`)}
                                label={`${theme.name}`}
                                clickable
                                size="small"
                                style={{
                                  marginRight: "4px",
                                  marginBottom: "4px"
                                }}
                              />
                            </Tooltip>
                          );
                        })}
                      <Empty />
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
      {themeEventList.total_page > 1 && (
        <div className="flex align center">
          <Pagination
            color={"primary"}
            count={themeEventList.total_page}
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

export default ThemeEventList;
