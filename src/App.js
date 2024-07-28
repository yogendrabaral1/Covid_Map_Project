import React from 'react';
import './App.css';
import Map from './MapComponent/Map';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { updateData, updateTooltip, updateMinMax } from './MapComponent/mapactions';
import { updateGlobal } from './SideComponent/SidecardActions';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Sidecard from './SideComponent/Sidecard';
import loading from './5.gif';


class App extends React.Component {
  componentDidMount() {
    axios({
      method: 'get',
      url: "https://corona-node.herokuapp.com/allcountrydata"

    }).then((response) => {
      console.log(response);
      this.props.updateData(response.data);
      this.props.updateGlobal(response.data);
      this.props.updateMinMax(response.data);
    }, (error) => {
      console.log(error);
    })
  }
  tooltipContent = (alphaThreeCode) => {
    try {
      //console.log(alphaThreeCode);
      var toolcontent = "";
      var date;
      if (alphaThreeCode != "") {
        if (this.props.data != undefined || this.props.data != "0") {
          this.props.data.data.map((item) => {
            if (alphaThreeCode === item.alphathreecode) {
              date = item.date;
              date = date.split('T');
              toolcontent = `<span style="text-align:left"><p><b>Country:</b> ${item.country_name}<br/><b>Confirmed cases:</b> ${item.confirmed.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br/><b style="color: red;">Deaths: ${item.death.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b><br/><b>Recovered:</b> ${item.recovered.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br/><b>Updated till:</b> ${date[0]}</p></span>`;
            }
          });
        }
      }
      this.props.updateTooltip(toolcontent);
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    let map;
    if (this.props.data.maxValue > 0) {
      map = <div>
        <Map data={this.props} setTooltipContent={this.tooltipContent} />
        <ReactTooltip>{this.props.data.tooltipcontent}</ReactTooltip>
        <Sidecard globaldata={this.props.globalData} data={this.props.data.data} case={"Global"} />
      </div>;
    }
    else {
      map = <img src={loading} alt="loading" width="30" height="30" style={{ position: "absolute", top: "50%", left: "50%" }} />;
    }
    return (
      <div className="App">
        {map}
      </div>
    );
  }
}

export default connect(
  state => ({ data: state.MapReducer, globalData: state.SidecardReducer.globalcase }),
  dispatch => ({
    updateData: bindActionCreators(updateData, dispatch),
    updateTooltip: bindActionCreators(updateTooltip, dispatch),
    updateGlobal: bindActionCreators(updateGlobal, dispatch),
    updateMinMax: bindActionCreators(updateMinMax, dispatch)
  })
)(App);
