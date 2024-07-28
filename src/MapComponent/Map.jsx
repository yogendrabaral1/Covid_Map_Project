import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule } from "react-simple-maps";
import MapClick from '../MapClickComponent/MapClick';

const Map = (props) => {
    const [mapClickState, setmapClickState] = useState(false);
    const [mapClickData, setmapClickData] = useState({ code: '0', country: '0', confirmed: 0, deaths: 0, recovered: 0 })
    const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
    const data = props.data.data.data;
    function mapClickContent(code) {
        if (code === "USA") {
            console.log(code);
            window.location.assign("/USA");
        }
        else if (code === mapClickData.code) {
            setmapClickState(false);
            setmapClickData({ code: '0', country: '0', confirmed: 0, deaths: 0, recovered: 0 });
        }
        else {
            let clickdata = data.find(d => (d.alphathreecode == code));
            console.log(clickdata);
            if (clickdata === undefined) {
                setmapClickState(false);
            } else {

                setmapClickState(true);
                setmapClickData({ code: clickdata.alphathreecode, country: clickdata.country_name, confirmed: clickdata.confirmed, deaths: clickdata.death, recovered: clickdata.recovered });

            }
        }
    }




    return (
        <React.Fragment>
            <ComposableMap data-tip="" data-html="true" data-type="info" width={1100} height={500}>
                <ZoomableGroup>
                    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                let country = data.find(d => (d.alphatwocode == geo.properties.ISO_A2));
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
                                        geography={geo}
                                        onClick={() => {
                                            const { ISO_A3 } = geo.properties;
                                            mapClickContent(`${ISO_A3}`)
                                        }}
                                        onMouseEnter={() => {
                                            const { ISO_A3 } = geo.properties;
                                            props.setTooltipContent(`${ISO_A3}`);
                                        }}
                                        onMouseLeave={() => {
                                            props.setTooltipContent('');
                                        }}
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
                                    />
                                )
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            {mapClickState ? (<MapClick mapClickData={mapClickData} setmapClickState={setmapClickState} />) : ""}
        </React.Fragment>
    );
};
export default Map;