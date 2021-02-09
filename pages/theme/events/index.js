import React from "react";

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
import {
  getAxiosResult,
  getStockRelativeEvent,
  getThemeEventList,
  getThemeRelativeEventList
} from "../../../http";
import { isError } from "../../../lib";
import ThemeEventList from "../../../containers/ThemeEventList/ThemeEventList";

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
        placeholder={"검색할 테마명을 입력하세요"}
        search={input.search}
        handleSearch={handleInput}
        submit={() => {}}
      />
    </form>
  );
};
const events = ({ themeEventList }) => {
  return (
    <MainLayout>
      <PageMeta title="테마 일정" />
      <Empty size="large" />
      <Searcher />
      <Empty />
      <ThemeEventList themeEventList={themeEventList} />
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
  if (!isError(themeEventList, "themeEventList")) {
    const promises = [];
    themeEventList.results.map((event, idx) => {
      promises.push(
        new Promise(async (rs, rj) => {
          const relatives = await getAxiosResult(
            getThemeRelativeEventList({
              theme: event.name
            })
          );

          if (!isError(relatives, "relatives")) {
            themeEventList.results[idx] = {
              ...themeEventList.results[idx],
              relatives
            };
            rs(relatives);
          } else {
            rj(relatives);
          }
        })
      );
    });

    await Promise.all(promises).catch(e => {
      console.error("fail to load relative stocks", e);
    });
  }

  return {
    props: {
      auth: toJS(auth),
      themeEventList
    } // will be passed to the page component as props
  };
}

export default withAuth(events);
