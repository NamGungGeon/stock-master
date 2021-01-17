import { Divider } from "@material-ui/core";
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

const themeDetail = ({ className }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MainLayout className={className}>
      <PageMeta title={`테마 이름`} description={`테마주 리스트`} />
      <Empty size="large" />
      <div>
        <TableContainer component={Paper}>
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
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Empty size="large" />
      <Divider light />
      <div>
        <h2>날짜별 N등주</h2>
        <TableContainer component={Paper}>
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
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Empty size="large" />
      <Divider light />
      <div>
        <h2>테마 일정</h2>
        <TableContainer component={Paper}>
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
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>북딱주식</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Empty size="large" />
    </MainLayout>
  );
};

export default themeDetail;
