import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";
import { toast } from "react-toastify";

import BtnPalet from "../widgets/BtnPalet";
import DateWidget from "../widgets/date/DateWidget";
import FilterWidget from "../widgets/filter/FilterWidget";
import SearchWidget from "../widgets/search/SearchWidget";
import StatisticWidget from "../widgets/statistic/StatisticWidget";
import { BtnNew, BtnExel, Spinner, PaginationV2 } from "../common";
import { statusi } from "../../constants/offersConstants";
import { compareDates } from "../../utils/helper";
import OffersTable from "./OffersTable";
import OffersMobileList from "./OffersMobileList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const OFFERS_API_URL = "/offers";

const columns = [
  { key: "offerId", label: "Id" },
  { key: "status", label: "Status" },
  { key: "customer", label: "Korisnik" },
  { key: "address", label: "Adresa" },

  { key: "products", label: "Proizvodi" },
  { key: "quantities", label: "Količina" },

  { key: "totalPrice", label: "Cena (RSD)" },
  { key: "avans", label: "Avans (RSD)" },
  { key: "forPayment", label: "Za Uplatu (RSD)" },

  { key: "dateOfIssue", label: "Datum ponude" },
  { key: "dateOfValidity", label: "Datum važenja" },
];

//searchBy
const searchByColumn = [
  { id: 1, name: "customer", label: "Korisnik" },
  { id: 2, name: "address", label: "Adresa" },
  { id: 3, name: "products", label: "Proizvod" },
];

const filterStatuses = {
  filterKey: "status",
  itemsToFilter: [{ name: "", label: "Statusi" }, ...statusi],
};

//for buttons palets
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

const Offers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate(location);

  //for loader spinner
  const [loading, setLoading] = useState(true);

  const [allOffers, setAllOffers] = useState([]);

  //paginacija
  const [pageSize] = useState(10);

  const { offerPage: currentPage, setOfferPage: setcurrentPage } = useAuth();

  //defien filter, filter is [key] = value pair:
  //npr: {developer:SvadbeniCvet,status:Active}
  const [filterBy, setFilterBy] = useState({});

  const [dateRange, setDateRange] = useState({
    orderDate: { label: "Datumi kreiranja", dates: [null, null] },
    deliveryTime: { label: "Datumi Roka", dates: [null, null] },
  });

  //searching
  const [searchQuery, setSearchQuery] = useState("");

  const [searchBy, setSearchBy] = useState({
    id: 1,
    name: "customer",
    label: "Korisnik",
  });

  //sortiranje
  const [sortColumn, setSortColumn] = useState({
    key: "dateOfIssue",
    order: "desc",
  });

  const [widgets, setWidgets] = useState({
    filter: true,
    dateFilter: false,
    search: false,
    statistic: false,
  });

  useEffect(() => {
    const convertDataToView = (offer) => {
      let newOffer = { ...offer };
      newOffer.products = convertProductToStrings(offer.listOfProduct);
      newOffer.forPayment = offer.totalPrice - offer.avans;
      newOffer.statusObj = statusi.find((s) => s.name === offer.status);

      return newOffer;
    };
    const getAllOffers = async () => {
      try {
        const { data: offers } = await axiosPrivate.get(OFFERS_API_URL);

        const convertedOffers = offers.map((item) => convertDataToView(item));

        setAllOffers(convertedOffers);

        setLoading(false);
      } catch (err) {
        toast.error(`🤭 ${err?.message}`);
        setLoading(false);
      }
    };
    getAllOffers();
  }, []);

  //da bi smo mogli filtrirati po proizvodu
  const convertProductToStrings = (products) => {
    return products.map((product) => product.name).join(",");
  };

  /*-------------------HANDLERI-------------------------------- */

  const handleOfferEdit = (offer) => {
    navigate(`/offers/${offer._id}`, {
      currentPage: currentPage,
    });
  };

  const handleStatusChange = async (offer, newStatusObj) => {
    //FRONTEND MODIFICTION

    let changedOffer = {
      ...offer,
      status: newStatusObj.name,
      statusObj: newStatusObj,
    };

    //allOffers without changed offer
    const restOfOffers = allOffers.filter((o) => o._id !== offer._id);

    setAllOffers([...restOfOffers, changedOffer]);

    //delete ono sto je na frontendu dodan
    const offerToSend = _.omit(
      changedOffer,
      "products",
      "forPayment",
      "statusObj",
      "_id"
    );
    //BACKEND MODIFICATION
    try {
      await axiosPrivate.put(
        OFFERS_API_URL + "/" + offer._id,
        JSON.stringify(offerToSend)
      );

      toast.success(`Status ponude ${offer._id}, promjenjen.`);
    } catch (err) {
      toast.error(`😢 Dogodila se greška.  ${err?.message}`);
      //if feiliure, rollback
      setAllOffers(allOffers);
    }
  };

  //hendlovanje paginacije
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

  //sortiranje
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
  //----------SERACH , FILTER, SORTING, PAGINATE---------------------------------

  function paginateData(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  }

  function search(items) {
    if (!searchQuery) return items;
    return items.filter((item) =>
      //includes znaci contains string
      item[searchBy.name].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  //npr:filterBy={status:Active}
  function filter(items) {
    if (_.isEmpty(filterBy)) return items;
    return items.filter((item) => {
      for (let [key, value] of Object.entries(filterBy)) {
        if (!item[key].includes(value)) return false;
      }
      return true;
    });
  }

  const filterDate = (items, dateState, label) => {
    if (dateState[0] === null || dateState[1] === null) return items;
    let min = dateState[0].toLocaleDateString();
    let max = dateState[1].toLocaleDateString();
    return items.filter((items) => {
      let date = new Date(items[label]).toLocaleDateString();
      return compareDates(date, min) && compareDates(max, date);
    });
  };

  const searched = search(allOffers);
  let filtered = filter(searched);
  filtered = filterDate(filtered, dateRange["orderDate"].dates, "orderDate");
  filtered = filterDate(
    filtered,
    dateRange["deliveryTime"].dates,
    "deliveryTime"
  );

  //sort
  const sorted = _.orderBy(filtered, [sortColumn.key], [sortColumn.order]);

  //paginate
  let offers = paginateData(sorted, currentPage, pageSize);

  return (
    <Container>
      <div className="paletBtnContainer">
        <BtnPalet
          buttons={buttons}
          btnClick={handleWidgetToggle}
          widgets={widgets}
        ></BtnPalet>
        <BtnExel className="btn blue exel" headers={columns} data={allOffers}>
          EXPORT EXEL
          <i className="fa fa-file-excel-o fa-lg" aria-hidden="true"></i>
        </BtnExel>
        <BtnNew
          title="Ponuda"
          linkTo="/offers/new"
          total={filtered.length}
        ></BtnNew>
      </div>
      <div className="widgets">
        <div className="widgetColumn">
          <FilterWidget
            filterGroups={[filterStatuses]}
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
          <OffersTable
            columns={columns}
            items={offers}
            count={filtered.length}
            handleSort={handleSort}
            renderSortIcon={renderSortIcon}
            handleEdit={handleOfferEdit}
          ></OffersTable>
          <OffersMobileList
            items={offers}
            handleEdit={handleOfferEdit}
            handleStatusChange={handleStatusChange}
          ></OffersMobileList>
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

export default Offers;
