import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { connect } from "react-redux";
import NeedToLogin from "../../Components/NeedToLogin";

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const price = {
  type: "number",
  valueFormatter: ({ value }) =>
    currencyFormatter.format(Number(value)).substring(1),
  cellClassName: "",
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    isUserDataPending: state.userDataObj.isPending,
    accountHistory: state.account.transactions,
  };
};

const DepositGrid = ({ accountHistory, isUserLoggedIn }) => {
  const [condition, setCondition] = useState(null);
  const [gridData, setGridData] = useState([]);

  const setDataIntoRows = () => {
    if (accountHistory.length > 0) {
      console.log("Account has Past DEPOSITS?WITHDRAWALS");
      let data = accountHistory
        .filter((record) => {
          return condition ? condition : true;
        })
        .map((record, i) => {
          return {
            id: i + 1,
            date: new Date(record.time),
            action: record.type === "DEPOSIT" ? "Deposit" : "Withdrawal",
            amount: record.value,
          };
        });
      setGridData(data);
    }
    return [];
  };

  console.log("gridData", gridData);

  useEffect(() => {
    console.log("ACCOUNT History", accountHistory);
    setDataIntoRows();
  }, [accountHistory]);

  return (
    <ErrorBoundary>
      <div style={{ height: "300px", width: "100%" }}>
        {isUserLoggedIn ? (
          <DataGrid
            rowHeight={28}
            headerHeight={32}
            disableMultipleSelection
            scrollbarSize={10}
            hideFooter
            loading={false}
            showColumnRightBorder={true}
            disableExtendRowFullWidth={false}
            columns={[
              {
                hide: true,
                field: "id",
                headerName: "",
                type: "number",
              },
              {
                field: "action",
                headerName: "Account Action",
                sortable: true,
                align: "left",
                type: "string",
                width: 150,
              },
              {
                field: "date",
                headerName: "Date",
                sortable: true,
                align: "left",
                type: "dateTime",
                width: 200,
              },
              {
                field: "amount",
                headerName: "Amount",
                sortable: true,
                align: "right",
                width: 150,

                ...price,
              },
            ]}
            rows={gridData}
          />
        ) : (
          <NeedToLogin />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositGrid);
