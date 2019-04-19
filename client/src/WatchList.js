import React, { Component } from 'react';
import { MDBListGroupItem, MDBRow, MDBCol } from "mdbreact";
import './WatchList.scss';
import { Link } from 'react-router-dom'
import Loading from './components/Loading'

class WatchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
        };
    }

    componentDidMount() {

        fetch('/api/watchlist')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data,
                    isLoaded: true,
                })
            });
    }

    imageClick = (id) => {
        this.props.history.push('/movie/'.concat(id));
    }

    closeClick = (id1) => {

        fetch(('/api/watchlist/' + id1), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(res => res.json())
            .then(data => {
                this.setState({
                    data: data,
                    isLoaded: true,
                })
            });;
    }

    render() {

        var { data, isLoaded } = this.state;
        var comment, country, language, genres, premiere, status, rating, officialSite, runtime, schedule_days, schedule_time, type, img, actor_h, episodes_schedule;

        if (!isLoaded) {
            return <Loading />
        } else if (data.length == 0) {
            return <div class="movie_list">
                <h3>There is no movies in the watch list yet.</h3>
                <h3>You can add them by clicking the "Add to Watch List" button at the Movie page! </h3></div>
        } else {
            return (

                <div class="movie_list" ><div><h3>WatchList</h3> {data.length} movies </div>

                    {data.map(dt => {
                        dt = JSON.parse(dt);

                        (dt.network == null || dt.network.country == null || dt.network.country.name == null) ? country = '-' : country = dt.network.country.name;
                        dt.language == null ? language = '-' : language = dt.language;
                        (dt.genres == null || dt.genres.length == 0) ? genres = "-" : genres = dt.genres.join(", ");
                        //dt.premiered == null ? premiere = '-' : premiere = dt.premiered; 
                        //data.type == null ? type = '' : type = <div>( {data.type} ) </div>;
                        //dt.status == null ? status = '' : status = <div>( {dt.status} )</div>; 
                        (dt.rating == null || dt.rating.average == null) ? rating = '-' : rating = dt.rating.average;
                        //dt.officialSite == null ? officialSite = '-' : officialSite = <a href= {dt.officialSite}>Link</a>; 
                        //dt.runtime == null ? runtime = '-' : runtime = dt.runtime;  
                        (dt.schedule == null || dt.schedule.days == null || dt.schedule.days.length == 0) ? schedule_days = '-' : schedule_days = <div>Every {dt.schedule.days.join(", ")}</div>;
                        (dt.schedule == null || dt.schedule.time == null) ? schedule_time = '' : schedule_time = <div> at {dt.schedule.time}</div>;
                        (dt.image == null || dt.image.medium == null) ? img = require('./images/unfoundMovie.png') : img = dt.image.medium;
                        (dt.comment == null || dt.comment == "") ? comment = '-' : comment = dt.comment;

                        return <MDBListGroupItem className="border-1">
                            
                                <MDBRow className="d-flex" >
                                   
                                    <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4">
                                        <div class="choose_movie">
                                        <img src={img} className="img-fluid"
                                            alt="" onClick={() => this.imageClick(dt.id)}  />
                                        </div>
                                    </MDBCol>
                                    

                                    <MDBCol xl = "7" lg = "7" md="7" sm = "7" xs = "7">
                                        <Link to={'/movie/' + dt.id}><h4>{dt.name}</h4></Link>
                                        <div class="list">
                                            <dl class="row">
                                                <dt class="col-sm-3">Country</dt>
                                                <dd class="col-sm-9"> {country} </dd>

                                                <dt class="col-sm-3">Language</dt>
                                                <dd class="col-sm-9">{language}</dd>

                                                <dt class="col-sm-3">Genres</dt>
                                                <dd class="col-sm-9">{genres}</dd>


                                                <dt class="col-sm-3">Rating</dt>
                                                <dd class="col-sm-9">{rating}</dd>


                                                <dt class="col-sm-3">Schedule</dt>
                                                <dd class="col-sm-9">{schedule_days} {schedule_time}
                                                    <p><Link to={'/episodes_schedule/' + dt.id}>Episodes Schedule</Link></p>


                                                </dd>
                                                <dt class="col-sm-3">Your Note</dt>
                                                <dd class="col-sm-9">{comment}</dd>
                                            </dl>
                                        </div>
                                    </MDBCol>
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="mt-1">
                                        <i class="fas fa-times-circle fa-2x close_icon choose_movie" onClick={() => this.closeClick(dt.id)}></i>
                                    </MDBCol>


                                </MDBRow>
                         
                        </MDBListGroupItem>
                        
                    })}
                </div>

            );
        }
    }

}

export default WatchList;