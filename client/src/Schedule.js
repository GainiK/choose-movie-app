import React, { Component } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import DatePicker from 'react-date-picker';
import ScheduleList from './ScheduleList';
import moment from 'moment';
import './Schedule.scss';
import { Route } from 'react-router-dom'


class Schedule extends Component {

    constructor(props) {

        super(props);

        this.options = countryList().getData();

        this.state = {
            isLoaded: false,
            data: [],
            options: this.options,
            value: null,
            date: null,
            selected: 0
        };
    }



    changeHandlerCountry = value1 => {

        this.setState(prevState => {
            return {
                value: value1,
                selected: prevState.selected + 1
            }
        });
        if (this.state.date != null) {
            var { date } = this.state;
            var date1 = moment(date).format("YYYY-MM-DD");
            var url = "/schedule/" + value1.value + "/" + date1;
            this.props.history.push(url);
        }
    }



    onChange = date => {

        this.setState(prevState => {
            return {
                date: date,
                selected: prevState.selected + 1
            }
        });

        if (this.state.value != null) {
            var { value } = this.state;
            var date1 = moment(date).format("YYYY-MM-DD");
            var url = "/schedule/" + value.value + "/" + date1;
            this.props.history.push(url);
        }
    }






    render() {
        var { value, options } = this.state;

        return (
            <div className="mt-4 ml-4">
                <MDBRow className="d-flex" >
                    <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4">
                        <h6>Select a country</h6>
                        <Select
                            options={options}
                            value={value}
                            onChange={this.changeHandlerCountry}
                        />
                    </MDBCol>
                    <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4" className="offset-xl-4 offset-lg-4 offset-md-4 offset-sm-4 offset-xs-4">
                        <h6>Select a day</h6>
                        <DatePicker
                            onChange={this.onChange}
                            value={this.state.date}
                            format="dd-MM-y"
                        />
                    </MDBCol>

                </MDBRow>
                
                <Route path="/schedule/:country/:date" component={ScheduleList} />
            </div>



        );


    }
}

export default Schedule;