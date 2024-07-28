import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

class TableView extends React.Component {
    constructor() {
        super();
        this.state = {
            data: "0"
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: "https://corona-node.herokuapp.com/allcountrydata"

        }).then((response) => {
            console.log(response.data.results);
            this.setState({ data: response.data.results });
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        const columns = [
            {
                Header: "Country Name",
                accessor: "country_name"
            }
        ];
        return (
            <div className="App">
                <h4>Global Covid-19 Data</h4>
            </div>
        );
    }


}
export default TableView;