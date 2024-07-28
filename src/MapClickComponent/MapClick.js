import React, { Component } from 'react';
import { Chart } from "react-google-charts";

const MapClick = (props) => {
    //console.log(props);
    return (
        <div className="card" style={{ position: "absolute", top: '82%', left: 450, width: '50%', padding: 1, opacity: 0.9, zIndex: 10, backgroundColor: "#ffffff", border: "1px solid #A9A9A9", color: "black" }}>
            <span style={{ fontSize: 8, textAlign: "right" }}><button onClick={() => { props.setmapClickState(false) }} style={{ border: 0 }}><b>X</b></button></span><span style={{ textAlign: "center" }}>{props.mapClickData.country}</span>
            <div className="card" style={{ width: "100%", display: "inline-block", textAlign: "center", border: 0, fontSize: 20 }}>
                <div className="col-2" style={{ float: "left", borderRight: "2px solid red", padding: 0 }}>{props.mapClickData.confirmed}<br></br><span style={{ fontSize: 8 }}>Confirmed Cases</span></div>
                <div className="col-2" style={{ float: "left", borderRight: "2px solid red", padding: 0 }}>{props.mapClickData.deaths}<br></br><span style={{ fontSize: 8 }}>Deaths</span></div>
                <div className="col-2" style={{ float: "left", padding: 0 }}>{props.mapClickData.recovered}<br></br><span style={{ fontSize: 8 }}>Recovered</span></div>
                <div className="col-3" style={{ float: "left", padding: 0 }}>
                    <Chart
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            [
                                'Element',
                                'Cases',
                                { role: 'style' },
                                {
                                    sourceColumn: 0,
                                    role: 'annotation',
                                    type: 'string',
                                    calc: 'stringify',
                                },
                            ],
                            ['', parseInt(props.mapClickData.confirmed), '#ed0710', null],
                            ['', parseInt(props.mapClickData.deaths), '#e3767a', null],
                            ['', parseInt(props.mapClickData.recovered), '#23cf4b', null],
                        ]}
                        options={{
                            title: '',
                            width: '120%',
                            height: 50,
                            bar: { groupWidth: '95%' },
                            legend: { position: 'none' },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '6' }}
                    />

                </div>
            </div>
        </div >
    );

}
export default MapClick;