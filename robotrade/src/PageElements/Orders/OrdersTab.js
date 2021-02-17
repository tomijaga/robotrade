import React, { useState, useEffect } from "react";
import CustomTab from "../CustomTab";
import OrderTable from "./OrderTable";
import AllOrdersTable from "./AllOrdersTable";
import FilledOrderTable from "./FilledOrderTable";
import { isArrayValid } from "../../Essential";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    active_orders: state.orders.active_orders,
    past_orders: state.orders.past_orders,
  };
};

const OrdersTab = ({ active_orders, past_orders }) => {
  const [workingOrders, setWorkingOrders] = useState([]);
  const [filledOrders, setFilledOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [terminatedOrders, setTerminatedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const orders = [...past_orders, ...active_orders];
    if (isArrayValid(orders)) {
      setAllOrders(() => orders);

      const filled = [];
      const terminated = [];
      const cancelled = [];

      past_orders.filter((order, i) => {
        switch (order.status) {
          case "CANCELLED":
            cancelled.push(order);
            break;
          case "FILLED":
            filled.push(order);
            break;
          case "TERMINATED":
            terminated.push(order);
            break;
          default:
            break;
        }
      });

      setWorkingOrders(() => active_orders);
      setFilledOrders(() => filled);
      setCancelledOrders(() => cancelled);
      setTerminatedOrders(() => terminated);

      console.log({
        workingOrders,
        filledOrders,
        terminatedOrders,
        cancelledOrders,
      });
    }
  }, [active_orders, past_orders]);

  console.log({
    active_orders,
    past_orders,
  });
  return (
    <div>
      <CustomTab tabs={["Working", "Filled", "Cancelled", "Terminated", "All"]}>
        {[
          <OrderTable className="working-orders" orders={workingOrders} />,
          <FilledOrderTable className="filled-orders" orders={filledOrders} />,
          <OrderTable className="cancelled-orders" orders={cancelledOrders} />,
          <OrderTable
            className="terminated-orders"
            orders={terminatedOrders}
          />,
          <AllOrdersTable className="all-orders" orders={allOrders} />,
        ]}
      </CustomTab>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
