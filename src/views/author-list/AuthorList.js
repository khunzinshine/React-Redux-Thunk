import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDataList } from "../../features/dataList/dataListApi";
import { ApiEndPoints } from "../../constants/apiEndpoints";
import FormSearch from "../../components/formSearch/FormSearch";
import DataTable from "../../components/table/DataTable";
import { ToastContext } from "../../context/toastContext";
import { Segment } from "semantic-ui-react";
import SkeletonComponent from "../../components/skeleton/SkeletonComponent";
import { isLoading } from "../../utils/common";
import { attributesCount, attributesCols } from "../../utils/common";
import { headerData } from "./DataExport";

const AuthorList = () => {
  const toast = useContext(ToastContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(history.location.search);
  const urlPage = parseInt(urlParams.get("page"), 10) || 1;
  const urlItemsPerPage = parseInt(urlParams.get("itemsPerPage"), 10) || 5;

  const [stateData, setStateData] = useState({
    hitsPerPage: urlItemsPerPage,
    page: urlPage,
    query: "redux",
  });

  const {
    dataList: { data },
    error,
  } = useSelector((state) => state.dataList);
  const { hits, nbPages } = data || {};
  const { loading } = useSelector((state) => state.system);

  useEffect(() => {
    if (error !== null) {
      toast.addToast("ERROR", error, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    dispatch(
      fetchDataList({
        url: ApiEndPoints.authorList,
        body: {
          page: stateData.hitsPerPage * (stateData.page - 1),
          hitsPerPage: stateData.hitsPerPage,
          query: stateData.query,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateData]);

  const attributes = [{ type: "text", name: "query", label: "Search ---" }];

  const handleChangeLimit = async (val) => {
    setStateData({ ...stateData, hitsPerPage: val, page: 1 });
  };

  const fetchDataPerPage = async (activePage, itemsPage, body) => {
    setStateData({
      hitsPerPage: itemsPage,
      page: activePage,
      query: body.search,
    });
  };

  const onSearchHandle = async (value) => {
    setStateData({ ...stateData, currentPage: 1, query: value["query"] });
  };

  const onRefreshHandle = async (key) => {
    setStateData({
      ...stateData,
      currentPage: 1,
      query: "redux",
    });
  };

  const setLoading = isLoading(data) ? false : true;

  return (
    <>
      {data && setLoading ? (
        <Segment>
          <FormSearch
            onSearchAction={onSearchHandle}
            onRefreshAction={onRefreshHandle}
            attributes={attributes}
            column={3}
          />
        </Segment>
      ) : (
        <SkeletonComponent
          count={attributesCount(attributes.length)}
          columnData={attributesCols(attributes.length)}
          className="skeleton-wrapper"
        />
      )}
      {data && !loading ? (
        <DataTable
          listData={hits}
          isLoading={loading}
          currentPage={stateData.page}
          columns={headerData}
          itemsPerPage={stateData.hitsPerPage}
          totalCount={nbPages}
          fetchDataPerPage={fetchDataPerPage}
          onChangeLimit={handleChangeLimit}
          sizeSelected={false}
          searchKey={stateData.query}
        />
      ) : (
        <SkeletonComponent
          count={stateData.hitsPerPage}
          columnData={headerData.length}
          selectedPerPage
          className="skeleton-wrapper"
        />
      )}
    </>
  );
};

export default AuthorList;
