import React, { Component } from "react";
import { Link} from 'react-router-dom'
import {  MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";
import Loading from './components/Loading'

class ScheduleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            parameters: this.props.match.params,
        };
    }

    componentDidMount() {

        var { parameters } = this.state;

        fetch('http://api.tvmaze.com/schedule?country=' + parameters.country + '&date=' + parameters.date)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    data: json
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.match.params != this.props.match.params) {
            var parameters = this.props.match.params;
            fetch('http://api.tvmaze.com/schedule?country=' + parameters.country + '&date=' + parameters.date)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        data: json
                    });
                })
        }
    }

    render() {
        var { data, isLoaded } = this.state;
        var airDate, airTime, name, episode, runtime;

        if (!isLoaded) {
            return <Loading />
        } else if (data.length == 0) {
            return <div class="mt-2">
                <h3>There is no available schedule for the selected country and date. Try to choose another country or date please!</h3>
            </div>
        } else {

            return (
                <div class="schedule_list">
                    <MDBListGroup className="ml-2 mr-4 mt-2">
                        <MDBListGroupItem className="border-5">
                            <MDBRow className="d-flex"  >
                                <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                    <b>Date</b>
                                </MDBCol>
                                <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                    <b>Time</b>
                                </MDBCol>
                                <MDBCol xl = "5" lg = "5" md="5" sm = "5" xs = "5" className="d-flex justify-content-center">
                                    <b>Show</b>
                                </MDBCol>
                                <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4" className="d-flex justify-content-center">
                                    <b>Episode</b>
                                </MDBCol>
                                <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                    <b>Runtime</b>
                                </MDBCol>
                            </MDBRow>
                        </MDBListGroupItem>
                        {data.map(dt => {
                            (dt.airdate == null) ? airDate = '-' : airDate = dt.airdate;
                            (dt.airtime == null) ? airTime = '-' : airTime = dt.airtime;
                            (dt.show.name == null) ? name = '-' : name = dt.show.name;
                            (dt.name == null) ? episode = '-' : episode = dt.name;
                            (dt.runtime == null) ? runtime = '-' : runtime = dt.runtime;


                            return <MDBListGroupItem className="border-1">


                                <MDBRow className="d-flex"  >
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                        {airDate}
                                    </MDBCol>
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                        {airTime}
                                    </MDBCol>
                                    <MDBCol xl = "5" lg = "5" md="5" sm = "5" xs = "5" className="d-flex justify-content-center">
                                        <Link to={'/movie/' + dt.show.id}>{name}</Link>

                                    </MDBCol>
                                    <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4" className="d-flex justify-content-center">
                                        {episode}
                                    </MDBCol>
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                        {runtime} min
                                    </MDBCol>
                                </MDBRow>

                            </MDBListGroupItem>
                        })
                        }
                    </MDBListGroup>

                </div>
            );
        }
    }

}

export default ScheduleList;