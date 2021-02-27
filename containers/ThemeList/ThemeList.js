import React from "react";
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
import { Button } from "@material-ui/core";
import { beautifyDate } from "../../lib/moment";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

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
const ThemeList = ({ themeList }) => {
  const router = useRouter();
  return (
    <EmptySafeZone
      data={themeList.results}
      renderWhenEmpty={() => (
        <div>
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
                  key={`${theme.id}-theme`}
                  moreRow={
                    <>
                      <MultiLines lines={parseHTML(theme.memo)} />
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
                pathname: `/theme`,
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

export default ThemeList;
