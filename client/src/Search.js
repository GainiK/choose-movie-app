import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";
import './Search.scss';
import Loading from './components/Loading'

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: [],
            parameters: this.props.match.params.query
        };
    }

    componentDidMount() {

        fetch('http://api.tvmaze.com/search/shows?q=' + this.state.parameters)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    data: json
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.match.params != this.props.match.params) {
            var parameters = this.props.match.params.query;
            fetch('http://api.tvmaze.com/search/shows?q=' + parameters)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        data: json
                    })
                })
        }
    }

    imageClick = (id) => {
        this.props.history.push('/movie/'.concat(id));
    }

    render() {

        var { data, isLoaded } = this.state;
        var img, name, type, language, genres, status, runtime, premiere, officialSite, schedule_days, schedule_time, rating, country;

        if (!isLoaded) {
            return <Loading />
        }
        else if (data.length == 0) {
            return <div class="mt-4 ml-4">
                <h3>Oooops.... There is no results for the query :(</h3>
                <h3>You may try to find the movie with the use of other words!</h3>
            </div>

        } else {

            return (
                <div>
                    <MDBListGroup>
                        {data.map(dt => {
                            (dt.show == null || dt.show.image == null || dt.show.image.medium == null) ? img = require('./images/unfoundMovie.png') : img = dt.show.image.medium;
                            (dt.show.network == null || dt.show.network.country == null || dt.show.network.country.name == null) ? country = '-' : country = dt.show.network.country.name;
                            dt.show.name == null ? name = "" : name = <h4>{dt.show.name}</h4>
                            dt.show.language == null ? language = '-' : language = dt.show.language;
                            (dt.show.genres == null || dt.show.genres.length == 0) ? genres = "-" : genres = dt.show.genres.join(", ");
                            dt.show.premiered == null ? premiere = '-' : premiere = dt.show.premiered;
                            dt.show.type == null ? type = '' : type = <div>( {dt.show.type} ) </div>;
                            dt.show.status == null ? status = '' : status = <div>( {dt.show.status} )</div>;
                            (dt.show.rating == null || dt.show.rating.average == null) ? rating = '-' : rating = dt.show.rating.average;
                            dt.show.officialSite == null ? officialSite = '-' : officialSite = <a href={dt.show.officialSite}>Link</a>;
                            dt.show.runtime == null ? runtime = '-' : runtime = dt.show.runtime;
                            (dt.show.schedule == null || dt.show.schedule.days == null || dt.show.schedule.days.length == 0) ? schedule_days = '-' : schedule_days = <div>Every {dt.show.schedule.days.join(", ")}</div>;
                            (dt.show.schedule == null || dt.show.schedule.time == null || dt.show.schedule.time == "") ? schedule_time = '' : schedule_time = (<div> at {dt.show.schedule.time}</div>);


                            return <MDBListGroupItem className="border-1">
                                <div class="choose_movie">
                                    <div className="ml-4"> {name} </div>
                                    <MDBRow className="d-flex" onClick={() => this.imageClick(dt.show.id)} >
                                        <MDBCol xl = "3" lg = "3" md="3" sm = "3" xs = "3" className="ml-4">


                                            <img src={img} className="img-fluid" class="img"
                                                alt="" />

                                        </MDBCol>
                                        <MDBCol xl = "7" lg = "7" md="7" sm = "7" xs = "7">

                                            <div class="list" className="mt-4">
                                                <dl class="row">
                                                    <dt class="col-sm-3">Country</dt>
                                                    <dd class="col-sm-9"> {country} </dd>

                                                    <dt class="col-sm-3">Language</dt>
                                                    <dd class="col-sm-9">{language} {type} </dd>

                                                    <dt class="col-sm-3">Genres</dt>
                                                    <dd class="col-sm-9">{genres}</dd>

                                                    <dt class="col-sm-3">Premiere</dt>
                                                    <dd class="col-sm-9">{premiere} {status}</dd>

                                                    <dt class="col-sm-3">Rating</dt>
                                                    <dd class="col-sm-9">{rating}</dd>

                                                    <dt class="col-sm-3">Official Site</dt>
                                                    <dd class="col-sm-9">{officialSite}</dd>

                                                    <dt class="col-sm-3">Runtime</dt>
                                                    <dd class="col-sm-9">{runtime} min</dd>

                                                    <dt class="col-sm-3">Schedule</dt>
                                                    <dd class="col-sm-9">{schedule_days} {schedule_time}</dd>
                                                </dl>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </MDBListGroupItem>
                        })
                        }
                    </MDBListGroup>
                </div>
            );
        }
    }




}

export default Search;