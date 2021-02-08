import React from "react";
import { withAuth } from "../../hoc/withAuth";
import MainLayout from "../../layout/MainLayout";
import PageMeta from "../../components/PageMeta/PageMeta";
import auth from "../../observables/auth";
import { toJS } from "mobx";
import {
  getAxiosResult,
  getStock,
  getStockHistory,
  getThemeRelativeEventList,
  getThemeRelativeStock
} from "../../http";
import { isError } from "../../lib";
import MultiLines from "../../components/MultiLines/MultiLines";
import { parseHTML } from "../../lib/markup";
import Empty from "../../components/Empty/Empty";
import { Divider } from "@material-ui/core";
import EmptySafeZone from "../../components/EmptySafeZone/EmptySafeZone";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { beautifyDate } from "../../lib/moment";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import DetailsIcon from "@material-ui/icons/Details";
import { Details } from "@material-ui/icons";
import ExpandableTableRow from "../../components/ExpandableTableRow/ExpandableTableRow";
import ThemeList from "../../containers/ThemeList/ThemeList";

const stockDetail = ({ className, stock, stockHistory, relativeThemeList }) => {
  return (
    <MainLayout className={className}>
      <PageMeta title={`${stock.name} (${stock.sosok})`} description={""} />
      <MultiLines lines={parseHTML(stock.memo)} />

      <Empty size="large" />
      <Divider light />
      <h2>특징주 History</h2>
      <EmptySafeZone data={stockHistory.results}>
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table
            style={{
              minWidth: "512px"
            }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>날짜</h3>
                </TableCell>
                <TableCell>
                  <h3>사유</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>변화량</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockHistory.results.map(history => {
                const isUp = parseInt(history.changes) > 0;
                return (
                  <TableRow>
                    <TableCell>{beautifyDate(history.history_date)}</TableCell>
                    <TableCell>{history.memo}</TableCell>
                    <TableCell align="right">
                      <div
                        className={"flex align center"}
                        style={{
                          color: isUp > 0 ? "red" : "blue",
                          justifyContent: "flex-end"
                        }}
                      >
                        {isUp ? (
                          <ChangeHistoryIcon fontSize={"small"} />
                        ) : (
                          <Details />
                        )}
                        <span>{history.changes}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
                // {
                //   "id": 10000,
                //   "stock": {
                //   "id": 2952,
                //     "name": "KD",
                //     "code": 44180,
                //     "sosok": "코스닥",
                //     "is_end": false,
                //     "created_date": "2021-01-13T09:50:40.544816",
                //     "destroy_date": null,
                //     "memo": ""
                // },
                //   "history_date": "2017-01-31",
                //   "changes": "29.65",
                //   "memo": "안희정 관련주로 시장에서 부각되며 상한가"
                // },
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </EmptySafeZone>
      <Empty size="large" />
      <Divider light />
      <h2>소속 테마</h2>
      <EmptySafeZone data={relativeThemeList}>
        <ThemeList
          themeList={(() => {
            return {
              ...relativeThemeList,
              results: relativeThemeList.results.map(rTheme => rTheme.theme)
            };
          })()}
        />
      </EmptySafeZone>
      <Empty size="large" />
    </MainLayout>
  );
};

export async function getServerSideProps({ params, req, res }) {
  if (!auth.isLogined)
    return {
      redirect: {
        destination: "/sign/in",
        permanent: true
      }
    };
  const { id } = params;

  const stock = await getAxiosResult(getStock(id));
  isError(stock, "stock");
  const stockHistory = await getAxiosResult(
    getStockHistory({ stock: stock.name, page: 1 })
  );
  isError(stockHistory, "stockHistory");
  const relativeThemeList = await getAxiosResult(
    getThemeRelativeStock({ stock: stock.name, page: 1 })
  );
  isError(relativeThemeList, "relativeThemeList");

  return {
    props: {
      auth: toJS(auth),
      stock,
      stockHistory,
      relativeThemeList
    } // will be passed to the page component as props
  };
}
export default withAuth(stockDetail);
