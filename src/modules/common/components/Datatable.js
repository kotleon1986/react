import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Table, Divider, Icon, Button } from "antd";

import { Typography } from "antd";

import Api from "../../../utils/api";
import _ from "lodash";

const { Title } = Typography;

const Datatable = props => {
  const { columns, endpoint, edit, history } = props;

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (init) {
      addActionsColumns();

      fetchData();
    }
  });

  const openEditPage = row => {
    dispatch({ type: edit, payload: row });
    history.push(`${history.location.pathname}/${row.id}/edit`);
  };

  const showDeletePopup = id => {
    console.log(id);
  };

  const addActionsColumns = () => {
    columns.push({
      title: "Actions",
      dataIndex: "id",
      render: (id, row) => (
        <Fragment>
          <Button type="link" onClick={() => openEditPage(row)}>
            <Icon type="edit" />
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => showDeletePopup(id)}>
            <Icon type="delete" />
          </Button>
        </Fragment>
      )
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };

    pager.current = pagination.current;

    setPagination(pager);

    const dir = sorter.order === "ascend" ? "asc" : "desc";

    filters = _.pickBy(_.pickBy(filters, _.identity), value => value.length);

    fetchData({
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.field,
      dir: dir,
      filters
    });
  };

  const fetchData = async (params = {}) => {
    try {
      setInit(false);
      setLoading(true);

      const result = await Api.request(endpoint, params);

      setData(result.data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Title level={3}>Users</Title>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Fragment>
  );
};

Datatable.propTypes = {
  columns: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  edit: PropTypes.string.isRequired
};

export default Datatable;
