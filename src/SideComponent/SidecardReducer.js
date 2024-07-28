const covid = {
    globalcase: {
        totalconfirmed: 0,
        totaldeath: 0,
        totalrecovered: 0,
        date: "0"
    }
};
const SidecardReducer = (state = covid, action) => {
    switch (action.type) {
        case 'GLOBAL':
            var totalconfirm = 0;
            var totaldeath = 0;
            var totalrecovered = 0;
            var date = "0";
            action.data.results.map((item) => {
                totalconfirm += parseInt(item.confirmed);
                totaldeath += parseInt(item.death);
                totalrecovered += parseInt(item.recovered);
            });
            date = action.data.results[0].date.split('T');
            totalconfirm = totalconfirm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totaldeath = totaldeath.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            totalrecovered = totalrecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return {
                ...state,
                globalcase: {
                    totalconfirmed: totalconfirm,
                    totaldeath: totaldeath,
                    totalrecovered: totalrecovered,
                    date: date[0]
                }
            }
        default:
            return state;
    }
}
export default SidecardReducer;