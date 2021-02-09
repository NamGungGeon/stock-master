import { toJS } from "mobx";
import React from "react";
import PageMeta from "../../../components/PageMeta/PageMeta";
import { withAuth } from "../../../hoc/withAuth";
import MainLayout from "../../../layout/MainLayout";
import auth from "../../../observables/auth";
import { useInput } from "../../../hooks";
import { useRouter } from "next/router";
import DateRangeSearcher from "../../../components/Searcher/DateRangeSearcher";
import TextSearcher from "../../../components/Searcher/TextSearcher";
import Empty from "../../../components/Empty/Empty";
import {
  getAxiosResult,
  getStockEventList,
  getStockRelativeEvent
} from "../../../http";
import { isError } from "../../../lib";
import StockEventList from "../../../containers/StockEventList/StockEventList";

const Searcher = () => {
  const [input, handleInput] = useInput({
    startDate: null,
    endDate: null,
    search: null
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

const event = ({ stockEventList }) => {
  return (
    <MainLayout>
      <PageMeta title="종목 일정" description="종목 일정" />
      <Empty size={"large"} />
      <Searcher />
      <Empty />
      <StockEventList stockEventList={stockEventList} />
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
  const stockEventList = await getAxiosResult(
    getStockEventList({
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
            getStockRelativeEvent({
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
      auth: toJS(auth),
      stockEventList
    } // will be passed to the page component as props
  };
}
export default withAuth(event);
