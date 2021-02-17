import React, {useEffect} from "react";
import MaxDiv from "../../Components/MaxDiv";
import GridDiv from "../../Components/GridDiv";
import CustomTab from "../../PageElements/CustomTab";
import { connect } from "react-redux";
import {setSelectedNavbarItem} from '../../Redux/appActions';
import AreaChart from '../../Components/Charts/LineChart';
import { timeParse } from "d3-time-format";
import Chart from "react-google-charts";
import TradedStocksTab from './TradedStocksTab';
import PerformanceTab from './PerformanceTab';


const parseDate = timeParse("%Y-%m-%d");

const mapDispatchToProps = (dispatch) => {
  return {
        setSelectedNavbarItem:(index)=>dispatch(setSelectedNavbarItem(index)),
  };
};

const mapStateToProps = (state) => {
  return {
   };
};

export const PortfolioPage = ({
setSelectedNavbarItem
}) => {

    useEffect(()=>{
        setSelectedNavbarItem(4);
    }, [])

  return (
      <CustomTab header tabs={["Performance", "Traded Stocks"]}>
    {[<PerformanceTab/>,<TradedStocksTab/> ]}
    </CustomTab>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage);
