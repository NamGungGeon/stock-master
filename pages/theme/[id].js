import { Chip, Divider, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import Empty from "../../components/Empty/Empty";
import PageMeta from "../../components/PageMeta/PageMeta";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import MainLayout from "../../layout/MainLayout";
import { getRLThemeEventList, getTheme, getThemeEventList, getThemeRankStockList, getThemeRankStockListByDate } from "../../http";
import auth from "../../observables/auth";
import { toJS } from "mobx";
import { isError } from "../../lib";
import { parseHTML } from "../../lib/markup";
import MultiLines from "../../components/MultiLines/MultiLines";
import { withAuth } from "../../hoc/withAuth";
import { Rating } from "@material-ui/lab";

const themeDetail = ({ className, theme, themeEventList, themeRankStockList, themeRankStockListByDate }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MainLayout className={className}>
      <PageMeta title={theme.name} description={""} />
      <MultiLines lines={parseHTML(theme.memo)} />
      <Empty size="large" />
      <Divider light />
      <h2>관련주</h2>
      <Chip label="삼성전자" color="primary" clickable size="small" style={{ marginRight: "4px" }} />
      <Chip label="삼성전자" color="primary" clickable size="small" style={{ marginRight: "4px" }} />
      <Chip label="삼성전자" color="primary" clickable size="small" style={{ marginRight: "4px" }} />
      <Empty size="large" />
      <Divider light />
      <h2>테마 N등주 History</h2>
      <div>
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table
            style={{
              minWidth: "512px",
            }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>종목 이름</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>1등횟수</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>2등횟수</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>타테마 1등횟수</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {themeRankStockList.results.map((rank) => {
                const { stock } = rank;
                return (
                  <TableRow>
                    <TableCell>
                      {stock.name} ({stock.sosok})
                    </TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">0</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Empty size="large" />
      <Divider light />
      <div>
        <h2>날짜별 N등주</h2>
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table
            style={{
              minWidth: "512px",
            }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>날짜</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>1등주</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>2등주</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>3등주</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {themeRankStockListByDate.map((rank) => {
                return (
                  <TableRow>
                    <TableCell>{rank.created}</TableCell>
                    <TableCell align="right">{rank.rank_1st || "-"}</TableCell>
                    <TableCell align="right">{rank.rank_2nd || "-"}</TableCell>
                    <TableCell align="right">{rank.rank_3th || "-"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Empty size="large" />
      <Divider light />
      <div>
        <h2>테마 일정</h2>
        <TableContainer component={Paper} elevation={0} variant={"outlined"}>
          <Table
            style={{
              minWidth: "512px",
            }}
            size="small"
            aria-label="a dense table"
          >
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
              {themeEventList.results.map((event) => {
                return (
                  <TableRow>
                    <TableCell>{event.name}</TableCell>
                    <TableCell align="right">
                      <Rating readOnly value={event.importance} />
                    </TableCell>
                    <TableCell align="right">
                      {event.target_date}
                      <br />~{event.target_end_date}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Empty size="large" />
    </MainLayout>
  );
};

export async function getServerSideProps({ params, req, res }) {
  if (!auth.isLogined)
    return {
      redirect: {
        destination: "/sign/in",
        permanent: true,
      },
    };
  const { id } = params;

  const theme = await getTheme(id)
    .then((res) => res.data)
    .catch((e) => e);
  isError(theme, "theme");

  const themeEventList = await getThemeEventList({ name: theme.name })
    .then((res) => res.data)
    .catch((e) => e);
  isError(themeEventList, "themeEventList");

  const rlThemeEventList = await getRLThemeEventList({ name: theme.name })
    .then((res) => res.data)
    .catch((e) => e);
  isError(rlThemeEventList, "rlthemeevent");

  const themeRankStockList = await getThemeRankStockList({ theme: theme.name })
    .then((res) => res.data)
    .catch((e) => e);
  isError(themeRankStockList, "themeRankStockList");
  const themeRankStockListByDate = await getThemeRankStockListByDate({ theme: theme.name })
    .then((res) => res.data)
    .catch((e) => e);
  isError(themeRankStockListByDate, "themeRankStockList");

  return {
    props: {
      theme,
      themeEventList,
      rlThemeEventList,
      themeRankStockList,
      themeRankStockListByDate,
      auth: toJS(auth),
    }, // will be passed to the page component as props
  };
}

export default withAuth(themeDetail);
