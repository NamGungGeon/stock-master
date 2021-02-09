import { toJS } from "mobx";
import React, { useEffect } from "react";
import PageMeta from "../../components/PageMeta/PageMeta";
import { withAuth } from "../../hoc/withAuth";
import MainLayout from "../../layout/MainLayout";
import auth from "../../observables/auth";
import { getStockList } from "../../http";
import { isError } from "../../lib";
import StockList from "../../containers/StockList/StockList";
import Empty from "../../components/Empty/Empty";
import TextSearcher from "../../components/Searcher/TextSearcher";
import { useRouter } from "next/router";
import { useInput } from "../../hooks";

const index = ({ query, stockList }) => {
  const router = useRouter();
  const [input, handleInput, setInput] = useInput({
    search: ""
  });
  useEffect(() => {
    if (query && query.search)
      setInput({
        search: query.search
      });
  }, [query]);

  return (
    <MainLayout>
      <PageMeta title="종목 정리" description="종목 정리" />
      <TextSearcher
        search={input.search}
        handleSearch={handleInput}
        placeholder={"검색하실 종목을 입력하세요"}
        submit={search => {
          router.push(`/stocks?search=${search}`);
        }}
      />
      <Empty size={"large"} />
      <StockList stockList={stockList} />
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

  const { code, search, page } = query;
  const stockList = await getStockList({
    code,
    name: search,
    page
  })
    .then(res => res.data)
    .catch(e => e);
  isError(stockList, "stockList");

  return {
    props: {
      auth: toJS(auth),
      stockList,
      query
    } // will be passed to the page component as props
  };
}
export default withAuth(index);
