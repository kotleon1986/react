import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Table, Divider, Icon, Button, Col, Row } from "antd";

import { Typography } from "antd";

import Api from "../../../utils/api";
import _ from "lodash";

const { Title } = Typography;

const Datatable = props => {
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { title, addButton, columns, store, params, history } = props;

  useEffect(() => {
    const { columns, endpoint, store, data, history } = props;

    const setParamsByDefault = () => {
      if (store.params) {
        if (store.params.sort) {
          const sortedColumn = columns.find(
            c => c.dataIndex === store.params.sort
          );
          sortedColumn.defaultSortOrder =
            store.params.dir === "desc" ? "descend" : "ascend";
        }

        if (store.params.filters) {
          const fields = Object.keys(store.params.filters);
          fields.forEach(field => {
            const filteredColumn = columns.find(c => c.dataIndex === field);
            filteredColumn.defaultFilteredValue = store.params.filters[field];
          });
        }
      }
    };

    const addActionsColumns = () => {
      columns.push({
        title: "Actions",
        dataIndex: "id",
        render: (id, row) => (
          <Fragment>
            <Button
              type="link"
              onClick={() =>
                history.push(`${history.location.pathname}/${row.id}/edit`)
              }
            >
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

    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await Api.request(endpoint, store.params);

        dispatch({ type: data, payload: result.data.items });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    const showDeletePopup = id => {
      console.log(id);
    };

    setParamsByDefault();

    if (store.data === null) {
      addActionsColumns();
    }

    if (!store.loaded) {
      fetchData();
    }
  }, [store, props, dispatch]);

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };

    pager.current = pagination.current;

    setPagination(pager);

    const dir = sorter.order === "ascend" ? "asc" : "desc";

    filters = _.pickBy(_.pickBy(filters, _.identity), value => value.length);

    dispatch({
      type: params,
      payload: {
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.field,
        dir: dir,
        filters
      }
    });
  };

  return (
    <Fragment>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={3}>
          <Title level={3}>{title}</Title>
        </Col>
        {addButton && (
          <Col span={3} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => history.push(`${history.location.pathname}/add`)}
            >
              <Icon type={addButton.icon} />
              {addButton.text}
            </Button>
          </Col>
        )}
      </Row>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={store.data}
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
  history: PropTypes.object.isRequired
};

export default Datatable;
