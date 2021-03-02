import React from "react";

import { useRouter } from "next/router";
import MainLayout from "../../../layout/MainLayout";
import PageMeta from "../../../components/PageMeta/PageMeta";
import Empty from "../../../components/Empty/Empty";
import { withAuth } from "../../../hoc/withAuth";
import DateRangeSearcher from "../../../components/Searcher/DateRangeSearcher";
import { useInput } from "../../../hooks";
import TextSearcher from "../../../components/Searcher/TextSearcher";
import { getAxiosResult } from "../../../http";
import { isError } from "../../../lib";
import ThemeEventList from "../../../containers/ThemeEventList/ThemeEventList";
import { getCurrentDateString } from "../../../lib/moment";

const Searcher = ({ filter }) => {
  const router = useRouter();
  const [input, handleInput] = useInput({
    ...filter
  });
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
const events = ({ themeEventList, filter }) => {
  return (
    <MainLayout>
      <PageMeta title="테마 일정" description={"테마 일정"} />
      <Empty size="large" />
      <Searcher filter={filter} />
      <Empty />
      <ThemeEventList themeEventList={themeEventList} />
    </MainLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const { auth } = req.session;
  const request = auth.request.bind(auth);

  if (!auth.filled())
    return {
      redirect: {
        destination: "/sign/in",
        permanent: true
      }
    };

  const todayDateString = getCurrentDateString("YYYY-MM-DD");
  const filter = {
    ...query,
    search: query.search ?? "",
    startDate: query.startDate ?? todayDateString,
    endDate: query.endDate ?? todayDateString
  };

  const { search, startDate, endDate, page } = filter;
  const themeEventList = await getAxiosResult(
    request().getThemeEventList({
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
            request().getThemeRelativeEventList({
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
      auth: auth.toJSON(),
      filter,
      themeEventList
    } // will be passed to the page component as props
  };
}

export default withAuth(events);
