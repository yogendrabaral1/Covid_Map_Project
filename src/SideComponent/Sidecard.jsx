import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

function Sidecard(props) {
    const data = props.data;
    //console.log(data);
    let accStyle = {
        border: "1px solid #72bcd4",
        marginBottom: 8,
        borderRadius: 5
    }

    const allcases = data.map((item) =>
        <div key={item.alphathreecode} style={{ padding: 0 }}>
            <Accordion style={accStyle}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={item.alphathreecode}>
                        {item.country_name}<span style={{ float: "right" }}>{item.confirmed}<span style={{ fontSize: 8 }}>   Confirmed</span></span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={item.alphathreecode}>
                        <Card.Body style={{ padding: 8 }}>
                            <div className="card" style={{ width: "100%", lineHeight: 1, fontSize: 20, display: "inline-block", paddingTop: 5, paddingBottom: 5, textAlign: "center" }}>
                                <div className="col-4" style={{ float: "left", borderRight: "2px solid red", padding: 0 }}>{item.confirmed}<br></br><span style={{ fontSize: 8 }}>Confirmed Cases</span></div>
                                <div className="col-4" style={{ float: "left", borderRight: "2px solid red", padding: 0 }}>{item.death}<br></br><span style={{ fontSize: 8 }}>Deaths</span></div>
                                <div className="col-4" style={{ float: "left", padding: 0 }}>{item.recovered}<br></br><span style={{ fontSize: 8 }}>Recovered</span></div>
                            </div>
                            <p style={{ fontSize: 8 }}>Last Updated: {item.date.substring(0, 10)}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
    return (
        <div className="card" style={{ position: "absolute", top: 70, left: 20, padding: 20, width: '26%', height: 650, opacity: 0.7, zIndex: 10, textAlign: "left", backgroundColor: "#ffffff", border: "1px solid #A9A9A9", color: "black" }}>
            <h5>Case Overview</h5>
            <div style={{ overflow: "scroll" }}>
                <Accordion defaultActiveKey="global" style={accStyle}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="global">
                            {props.case} Cases
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="global">
                            <Card.Body style={{ padding: 8 }}>
                                <div className="card" style={{ width: "100%", lineHeight: 1, fontSize: 20, display: "inline-block", paddingTop: 5, paddingBottom: 5, textAlign: "center" }}>
                                    <div className="col-4" style={{ float: "left", borderRight: "2px solid red", padding: 0 }}>{props.globaldata.totalconfirmed}<br></br><span style={{ fontSize: 8 }}>Confirmed Cases</span></div>
                                    <div className="col-4" style={{ float: "left", borderRight: "2px solid red", padding: 0 }}>{props.globaldata.totaldeath}<br></br><span style={{ fontSize: 8 }}>Deaths</span></div>
                                    <div className="col-4" style={{ float: "left", padding: 0 }}>{props.globaldata.totalrecovered}<br></br><span style={{ fontSize: 8 }}>Recovered</span></div>
                                </div>
                                <p style={{ fontSize: 8 }}>Last Updated: {props.globaldata.date}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                {allcases}
            </div>
        </div >
    );
}
export default Sidecard;