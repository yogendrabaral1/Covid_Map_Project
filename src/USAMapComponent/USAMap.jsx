import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
    ZoomableGroup
} from "react-simple-maps";
import UScovid from "../USCovid.json";
import Sidecard from '../SideComponent/Sidecard';
import MapClick from "../MapClickComponent/MapClick";
import ReactTooltip from 'react-tooltip';

const USAMap = (props) => {
    const [mapClickState, setmapClickState] = useState(false);
    const [mapClickData, setmapClickData] = useState({ code: '0', country: '0', confirmed: 0, deaths: 0, recovered: 0 });
    const [toolTip, settoolTip] = useState("");
    const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
    let data = UScovid;
    let totalData = ({ totalconfirmed: 0, totaldeath: 0, totalrecovered: 0 });
    data.map((item) => {
        totalData.totalconfirmed += item.confirmed;
        totalData.totaldeath += item.death;
        totalData.totalrecovered += item.recovered;
    })

    totalData.totalconfirmed = totalData.totalconfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalData.totaldeath = totalData.totaldeath.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalData.totalrecovered = totalData.totalrecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    function mapClickContent(code) {
        if (code === mapClickData.code) {
            setmapClickState(false);
            setmapClickData({ code: '0', country: '0', confirmed: 0, deaths: 0, recovered: 0 });
        }
        else {
            let clickdata = data.find(d => (d.state == code));
            console.log(clickdata);
            if (clickdata === undefined) {
                setmapClickState(false);
            } else {

                setmapClickState(true);
                setmapClickData({ code: clickdata.state, country: clickdata.state, confirmed: clickdata.confirmed, deaths: clickdata.death, recovered: clickdata.recovered });

            }
        }
    }

    function tooltipContent(alphaThreeCode) {
        try {
            //console.log(alphaThreeCode);
            var toolcontent = "";
            var date;
            if (alphaThreeCode != "") {
                if (data != undefined || data != "0") {
                    data.map((item) => {
                        if (alphaThreeCode === item.alphathreecode) {
                            date = item.date;
                            date = date.split('T');
                            toolcontent = `<span style="text-align:left"><p><b>Country:</b> ${item.country_name}<br/><b>Confirmed cases:</b> ${item.confirmed}<br/><b style="color: red;">Deaths: ${item.death}</b><br/><b>Recovered:</b> ${item.recovered}<br/><b>Updated till:</b> ${date[0]}</p></span>`;
                        }
                    });
                }
            }
            settoolTip(toolcontent);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <ComposableMap projection="geoAlbersUsa" data-tip="" data-html="true" data-type="info" width={1100} height={500}>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map(geo => {
                                    let country = data.find(d => (d.state == geo.properties.name));
                                    if (country == undefined) {
                                        country = "#059646";
                                    }
                                    else if (parseInt(country.confirmed) < 10000) {
                                        country = "#dbcbc8";
                                    } else if (parseInt(country.confirmed) < 20000) {
                                        country = "#c9b7b5";
                                    } else if (parseInt(country.confirmed) < 30000) {
                                        country = "#c7867f";
                                    } else if (parseInt(country.confirmed) < 40000) {
                                        country = "#0018b3";
                                    } else if (parseInt(country.confirmed) < 50000) {
                                        country = "#eb6e60";
                                    } else if (parseInt(country.confirmed) < 70000) {
                                        country = "#f0503e";
                                    } else if (parseInt(country.confirmed) < 90000) {
                                        country = "#e01700";
                                    } else if (parseInt(country.confirmed) < 100000) {
                                        country = "#c71804";
                                    } else if (parseInt(country.confirmed) < 270000) {
                                        country = "#c20202";
                                    } else if (parseInt(country.confirmed) > 270000) {
                                        country = "#690b00";
                                    }
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            stroke="#FFF"
                                            geography={geo}
                                            onClick={() => {
                                                const { name } = geo.properties;
                                                mapClickContent(`${name}`)
                                            }}
                                            onMouseEnter={() => {
                                                const { name } = geo.properties;
                                                tooltipContent(`${name}`);
                                            }}
                                            onMouseLeave={() => {
                                                tooltipContent("");
                                            }}
                                            fill="#DDD"
                                            style={{
                                                default: {
                                                    fill: country,
                                                    outline: "none",
                                                    stroke: "#FFF",
                                                    strokeWidth: 0.5,
                                                },
                                                hover: {
                                                    fill: "#F53",
                                                    outline: "none",
                                                    stroke: "#FFF",
                                                    strokeWidth: 0.75,
                                                },
                                                pressed: {
                                                    fill: "#E42",
                                                    outline: "none",
                                                    stroke: "#FFF",
                                                    strokeWidth: 0.75,
                                                }
                                            }}
                                        />)
                                })}
                                {geographies.map(geo => {
                                    const centroid = geoCentroid(geo);
                                    const cur = UScovid.find(s => s.state === geo.properties);
                                    return (
                                        <g key={geo.rsmKey + "-name"}>
                                            {cur &&
                                                <Marker coordinates={centroid}>
                                                    <text y="2" fontSize={14} textAnchor="middle">
                                                        {cur.id}
                                                    </text>
                                                </Marker>
                                            }
                                        </g>
                                    );
                                })}
                            </>
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip>{toolTip}</ReactTooltip>
            <Sidecard globaldata={totalData} data={data} case={"USA"} />
            {mapClickState ? (<MapClick mapClickData={mapClickData} setmapClickState={setmapClickState} />) : ""}
        </React.Fragment>
    );
};
export default USAMap;