import React, { useEffect } from "react";
import PageMeta from "../../components/PageMeta/PageMeta";
import Empty from "../../components/Empty/Empty";
import { useRouter } from "next/router";

import { getThemeList } from "../../http";
import MainLayout from "../../layout/MainLayout";
import auth from "../../observables/auth";
import { toJS } from "mobx";
import { withAuth } from "../../hoc/withAuth";
import ThemeList from "../../containers/ThemeList/ThemeList";
import TextSearcher from "../../components/Searcher/TextSearcher";
import { useInput } from "../../hooks";

const theme = ({ className, query, themeList }) => {
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
    <MainLayout className={className}>
      <PageMeta title={"테마 정보"} description={"테마 정보"} />
      <TextSearcher
        search={input.search}
        handleSearch={handleInput}
        placeholder={"검색하실 테마를 입력하세요"}
        submit={search => {
          router.push(`/theme?search=${search}`);
        }}
      />
      <Empty size={'large'}/>
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
