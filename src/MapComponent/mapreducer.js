const covid = {
    data: "0",
    tooltipcontent: "",
    minValue: 0,
    maxValue: 0
};
const MapReducer = (state = covid, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                data: action.data.results
            }
        case 'TOOLTIP':
            return {
                ...state,
                tooltipcontent: action.data
            }
        case 'MINMAX':
            var minvalue = 0;
            var maxvalue = 0;
            action.data.results.map((item) => {
                var value = parseInt(item.confirmed);
                action.data.results.map((val) => {
                    if (value < parseInt(val.confirmed)) {
                        if (minvalue > value) {
                            minvalue = value;
                        }
                        if (maxvalue < parseInt(val.confirmed)) {
                            maxvalue = parseInt(val.confirmed);
                        }
                    }
                });
            });
            return {
                ...state,
                minValue: minvalue,
                maxValue: maxvalue
            }
        default:
            return state;
    }
}
export default MapReducer;