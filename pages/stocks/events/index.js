import React from "react";
import PageMeta from "../../../components/PageMeta/PageMeta";
import { withAuth } from "../../../hoc/withAuth";
import MainLayout from "../../../layout/MainLayout";
import { useInput } from "../../../hooks";
import { useRouter } from "next/router";
import DateRangeSearcher from "../../../components/Searcher/DateRangeSearcher";
import TextSearcher from "../../../components/Searcher/TextSearcher";
import Empty from "../../../components/Empty/Empty";
import { getAxiosResult } from "../../../http";
import { isError } from "../../../lib";
import StockEventList from "../../../containers/StockEventList/StockEventList";
import { getCurrentDateString } from "../../../lib/moment";

const Searcher = ({ filter }) => {
  const [input, handleInput] = useInput({
    ...filter
  });
  const router = useRouter();
  return (
    <form action="/stocks/events" method="GET">
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

const event = ({ stockEventList, filter }) => {
  return (
    <MainLayout>
      <PageMeta title="종목 일정" description="종목 일정" />
      <Empty size={"large"} />
      <Searcher filter={filter} />
      <Empty />
      <StockEventList stockEventList={stockEventList} />
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
  const stockEventList = await getAxiosResult(
    request().getStockEventList({
      name: search,
      target_date: startDate,
      target_end_date: endDate,
      page
    })
  );
  if (!isError(stockEventList, "stockEventList")) {
    const promises = [];
    stockEventList.results.map((event, idx) => {
      promises.push(
        new Promise(async (rs, rj) => {
          const relatives = await getAxiosResult(
            request().getStockRelativeEvent({
              event: event.name
            })
          );
          if (!isError(relatives, "relatives")) {
            stockEventList.results[idx] = {
              ...stockEventList.results[idx],
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
      stockEventList
    } // will be passed to the page component as props
  };
}
export default withAuth(event);
