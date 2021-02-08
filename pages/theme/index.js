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
import ThemeList from "../../containers/ThemeList/ThemeList";
import Searcher from "../../components/Searcher/Searcher";

const theme = ({ className, query, themeList }) => {
  const router = useRouter();
  return (
    <MainLayout className={className}>
      <PageMeta title={"테마 정보"} description={"테마 정보"} />
      <Searcher
        value={query ? query.search : ""}
        placeholder={"검색하실 테마를 입력하세요"}
        submit={search => {
          router.push(`/theme?search=${search}`);
        }}
      />
      <Empty />
      <Empty />
      <ThemeList themeList={themeList} />
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
