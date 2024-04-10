import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import styled from "styled-components";

import BtnPalet from "../widgets/BtnPalet";
import DateWidget from "../widgets/date/DateWidget";
import FilterWidget from "../widgets/filter/FilterWidget";
import SearchWidget from "../widgets/search/SearchWidget";
import StatisticWidget from "../widgets/statistic/StatisticWidget";
import { BtnNew, BtnExel, Spinner, PaginationV2 } from "../common";
import OrdersMobileList from "./OrdersMobileList";
import OrdersTable from "./OrdersTable";
import { statusi, developeri } from "../../constants/orderConstants";
import { compareDates } from "../../utils/helper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const ORDERS_API_URL = "/orders";

const filterDeveloper = {
  filterKey: "developer",
  itemsToFilter: [{ name: "", label: "Izvođači" }, ...developeri],
};

const filterStatuses = {
  filterKey: "status",
  itemsToFilter: [{ name: "", label: "Statusi" }, ...statusi],
};

const searchByColumn = [
  { id: 1, name: "customer", label: "Korisnik" },
  { id: 2, name: "address", label: "Adresa" },
  { id: 3, name: "products", label: "Proizvod" },
];

const columns = [
  { key: "orderId", label: "Id" },
  { key: "status", label: "Status" },
  { key: "developer", label: "Izvođač" },
  { key: "customer", label: "Korisnik" },
  { key: "address", label: "Adresa" },
  { key: "products", label: "Proizvodi" },
  { key: "quantities", label: "Količine" },
  { key: "totalPrice", label: "Cena (RSD)" },
  { key: "avans", label: "Avans (RSD)" },
  { key: "forPayment", label: "Za Uplatu (RSD)" },
  { key: "note", label: "Napomena" },
  { key: "orderDate", label: "Kreiran" },
  { key: "deliveryTime", label: "Rok" },
];

const buttons = [
  {
    name: "search",
    label: "PRETRAGA",
    icon: <i className="fa fa-search fa-lg" aria-hidden="true"></i>,
  },
  {
    name: "filter",
    label: "FILTER",
    icon: <i className="fa fa-filter fa-lg" aria-hidden="true"></i>,
  },
  {
    name: "dateFilter",
    label: "FILTER DATUMA",
    icon: <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>,
  },
  {
    name: "statistic",
    label: "STATISTIKA",
    icon: <i className="fa fa-bar-chart fa-lg"></i>,
  },
];

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate(location);

  const [loading, setLoading] = useState(true);

  const [allOrders, setAllOrders] = useState([]);

  const [pageSize] = useState(10);

  const { orderPage: currentPage, setOrderPage: setcurrentPage } = useAuth();

  //defien filter, filter is [key] = value pair:
  //npr: {developer:SvadbeniCvet,status:Active}
  const [filterBy, setFilterBy] = useState({});

  const [dateRange, setDateRange] = useState({
    orderDate: { label: "Datumi kreiranja", dates: [null, null] },
    deliveryTime: { label: "Datumi Roka", dates: [null, null] },
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [searchBy, setSearchBy] = useState(searchByColumn[0]);

  const [sortColumn, setSortColumn] = useState({
    key: "orderDate",
    order: "desc",
  });

  const [widgets, setWidgets] = useState({
    filter: true,
    dateFilter: false,
    search: false,
    statistic: false,
  });

  useEffect(() => {
    const convertOrderToView = (order) => {
      let newOrder = { ...order };
      newOrder.products = convertProductToStrings(order.listOfProduct);
      newOrder.forPayment = order.totalPrice - order.avans;
      newOrder.statusObj = statusi.find((s) => s.name === order.status);

      return newOrder;
    };
    const getAllOrders = async () => {
      setLoading(true);
      try {
        const { data: orders } = await axiosPrivate.get(ORDERS_API_URL);

        const convertedOrders = orders.map((item) => convertOrderToView(item));

        setAllOrders(convertedOrders);

        setLoading(false);
      } catch (err) {
        toast.error(`🤭 ${err?.message}`);
        setLoading(false);
      }
    };

    getAllOrders();
  }, [axiosPrivate]);

  //da bi smo mogli filtrirati po proizvodu
  const convertProductToStrings = (products) => {
    return products.map((product) => product.name).join(",");
  };

  /*-------------------HANDLERI-------------------------------- */

  const handleOrderEdit = (order) => {
    navigate(`/orders/${order._id}`, {
      currentPage: currentPage,
    });
  };

  const handleStatusChange = async (order, newStatusObj) => {
    //FRONTEND MODIFICTION

    let changedOrder = {
      ...order,
      status: newStatusObj.name,
      statusObj: newStatusObj,
    };

    //allOrders without changed order
    const restOfOrders = allOrders.filter((o) => o._id !== order._id);

    setAllOrders([...restOfOrders, changedOrder]);

    //delete ono sto je na frontendu dodan
    const orderToSend = _.omit(
      changedOrder,
      "products",
      "forPayment",
      "statusObj",
      "_id"
    );
    //BACKEND MODIFICATION
    try {
      await axiosPrivate.put(
        ORDERS_API_URL + "/" + order._id,
        JSON.stringify(orderToSend)
      );

      toast.success(`Status narudžbe ${order.orderId}, promjenjen.`);
    } catch (err) {
      toast.error(`😢 Dogodila se greška.  ${err?.message}`);
      //if feiliure, rollback
      setAllOrders(allOrders);
    }
  };

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    //setFilterBy(null);
    setcurrentPage(1);
  };

  const handleSearchBy = (itemBy) => {
    setSearchBy(itemBy);
  };

  const handleFiltering = (key, value) => {
    const newFilter = { ...filterBy };
    //dodaj novi ako ima, ako je valu="", tada je izabrana
    //vrijednost filter all, pa obrisi vrijednost za tay key
    value === "" ? delete newFilter[key] : (newFilter[key] = value);
    setFilterBy(newFilter);

    setcurrentPage(1);
  };

  const handleDateRange = (key, update) => {
    //update je oblika npr: [Date, null]
    const newDateRange = { ...dateRange };
    newDateRange[key].dates = update;
    setDateRange(newDateRange);
    setcurrentPage(1);
  };

  const handleSort = (key) => {
    //necemo sortiranje na product, quantities,id
    if (key === "products" || key === "quantities" || key === "id") return;
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.key === key)
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.key = key;
      newSortColumn.order = "asc";
    }
    setSortColumn(newSortColumn);
  };

  const handleWidgetToggle = (name) => {
    const newWidgets = { ...widgets };
    newWidgets[name] = !widgets[name];
    setWidgets(newWidgets);
    clearWidgetState(name);
  };

  //CLEAR FILTERS AFTER CLOSE
  const clearWidgetState = (name) => {
    switch (name) {
      case "search":
        setSearchQuery("");
        break;
      case "filter":
        setFilterBy(null);
        break;
      case "dateFilter":
        handleDateRange("orderDate", [null, null]);
        handleDateRange("deliveryTime", [null, null]);
        break;
      default:
    }
  };

  const renderSortIcon = (column) => {
    //necemo sortiranje na product and quantities
    if (column.key === "products" || column.key === "quantities") return;
    if (column.key !== sortColumn.key) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  /*--------------------------------------------------- */

  //-----------START SEARCH, FILTERING, SORTING, PAGINATION--------------
  function paginateData(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  }

  const search = (item) => {
    if (!searchQuery) return true;
    return item[searchBy.name]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  };

  const filter = (item) => {
    if (_.isEmpty(filterBy)) return true;
    for (let [key, value] of Object.entries(filterBy)) {
      if (!item[key].includes(value)) return false;
    }
    return true;
  };

  const filterDate = (item, dateKey) => {
    const values = dateRange[dateKey].dates;
    if (values[0] === null || values[1] === null) return true;
    const min = values[0].toLocaleDateString();
    const max = values[1].toLocaleDateString();
    const date = new Date(item[dateKey]).toLocaleDateString();
    return compareDates(date, min) && compareDates(max, date);
  };

  const isFilterSearcEnable = () => {
    return !(
      !searchQuery &&
      _.isEmpty(filterBy) &&
      dateRange.orderDate.dates.every((el) => el === null) &&
      dateRange.deliveryTime.dates.every((el) => el === null)
    );
  };

  function filterAndSearch(items) {
    return isFilterSearcEnable()
      ? items.filter(
          (item) =>
            filter(item) &&
            filterDate(item, "orderDate") &&
            filterDate(item, "deliveryTime") &&
            search(item)
        )
      : items;
  }

  let filtered = filterAndSearch(allOrders);

  const sorted = _.orderBy(filtered, [sortColumn.key], [sortColumn.order]);

  let orders = paginateData(sorted, currentPage, pageSize);

  return (
    <Container>
      <div className="paletBtnContainer">
        <BtnPalet
          buttons={buttons}
          btnClick={handleWidgetToggle}
          widgets={widgets}
        ></BtnPalet>
        <BtnExel className="btn blue exel" headers={columns} data={allOrders}>
          EXPORT EXEL
          <i className="fa fa-file-excel-o fa-lg" aria-hidden="true"></i>
        </BtnExel>
        <BtnNew
          title="Narudžba"
          linkTo="/orders/new"
          total={filtered.length}
        ></BtnNew>
      </div>

      <div className="widgets">
        <div className="widgetColumn">
          <FilterWidget
            filterGroups={[filterDeveloper, filterStatuses]}
            filterBy={filterBy}
            handleFiltering={handleFiltering}
            display={widgets["filter"]}
            onClose={handleWidgetToggle}
          ></FilterWidget>

          <SearchWidget
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            searchByColumn={searchByColumn}
            searchBy={searchBy}
            handleSearchBy={handleSearchBy}
            display={widgets["search"]}
            onClose={handleWidgetToggle}
          ></SearchWidget>
        </div>
        <div className="widgetColumn">
          <DateWidget
            dateRange={dateRange}
            handleDateRange={handleDateRange}
            display={widgets["dateFilter"]}
            onClose={handleWidgetToggle}
          ></DateWidget>

          <StatisticWidget
            items={filtered}
            display={widgets["statistic"]}
            onClose={handleWidgetToggle}
          ></StatisticWidget>
        </div>
      </div>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <React.Fragment>
          <OrdersTable
            columns={columns}
            items={orders}
            count={filtered.length}
            handleSort={handleSort}
            renderSortIcon={renderSortIcon}
            handleEdit={handleOrderEdit}
          ></OrdersTable>
          <OrdersMobileList
            items={orders}
            handleEdit={handleOrderEdit}
            handleStatusChange={handleStatusChange}
          ></OrdersMobileList>
        </React.Fragment>
      )}

      <PaginationV2
        totalCount={filtered.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></PaginationV2>
    </Container>
  );
};

const Container = styled.div`
  .paletBtnContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blue {
    border-color: #3a4d56;
    color: #3a4d56;
    box-shadow: 0 0 10px 0 #3a4d56 inset, 0 0 10px 4px #3a4d56;
    transition: all 150ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #3a4d56 inset, 0 0 0 0 #3a4d56;
      color: #f8f9fa;
    }
  }

  .widgets {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .widgetColumn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: fle;
  }

  //desktop view
  @media (min-width: 800px) {
    .widgetColumn {
      width: 50%;
      gap: 2rem;
    }
  }
`;

export default Orders;
