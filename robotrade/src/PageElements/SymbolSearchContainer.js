import React from "react";
import Search from "../Components/Search";
import MaxDiv from "../Components/MaxDiv";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    tradingPageSymbol: state.tradingPage.symbol,
  };
};

const SymbolSearchContainer = ({
  tradingPageSymbol,
  children,
  onSymbolChange,
  ...rest
}) => {
  return (
    <div>
      <div className="inline-bottom" style={{ display: "flex" }}>
        <Search
          className
          searchBoxSize="small"
          style={{ color: "azure", width: "100%", height: "15px" }}
          height="100px"
          onClick={(event) => {
            const symbol = event.currentTarget.querySelector(".symbol")
              .innerText;

            onSymbolChange(symbol);
          }}
          {...rest}
        />
        <div>{tradingPageSymbol}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymbolSearchContainer);
