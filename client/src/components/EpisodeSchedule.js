import React from 'react'
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import Loading from './Loading'

class EpisodeSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            currentPage: null,
            totalPages: null,
            currentData: [],
            episodes: [],
            parameters: this.props.match.params
        };

    }

    componentDidMount() {
        fetch('http://api.tvmaze.com/shows/' + this.state.parameters.id + '/episodes')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    episodes: json,
                });
            })
    }

    render() {

        var { isLoaded, episodes } = this.state;

        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        if (!isLoaded) {
            return <Loading />
        } else {
            var airDate, airTime, name, episode, runtime, season, sch_number, episode_url, episode_summary;
            if (episodes == null || episodes.length == 0) {
                return <div>We are sorry, but the episodes release schedule is not available yet. </div>
            }
            return (
                <div class="description">
                    <div>
                        <MDBListGroup className="ml-2 mr-4">
                            <MDBListGroupItem className="border-5">
                                <MDBRow className="d-flex"  >
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                        <b>Season</b>
                                    </MDBCol>
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                        <b>Episode Number</b>
                                    </MDBCol>
                                    <MDBCol xl = "2" lg = "2" md="2" sm = "2" xs = "2" className="d-flex justify-content-center">
                                        <b>Date</b>
                                    </MDBCol>
                                    <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                        <b>Time</b>
                                    </MDBCol>
                                    <MDBCol xl = "3" lg = "3" md="3" sm = "3" xs = "3" className="d-flex justify-content-center">
                                        <b>Episode Name</b>
                                    </MDBCol>
                                    <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4" className="d-flex justify-content-center">
                                        <b>Summary</b>
                                    </MDBCol>
                                </MDBRow>

                            </MDBListGroupItem>
                            {episodes.map(dt => {
                                (dt.airdate == null) ? airDate = '-' : airDate = dt.airdate;
                                (dt.airtime == null) ? airTime = '-' : airTime = dt.airtime;
                                (dt.name == null) ? episode = '-' : episode = dt.name;
                                (dt.runtime == null) ? runtime = '-' : runtime = dt.runtime;
                                (dt.season == null) ? season = '-' : season = dt.season;
                                (dt.number == null) ? sch_number = '-' : sch_number = dt.number;
                                (dt.url == null) ? episode_url = episode : episode_url = <a href={dt.url}>{episode}</a>;
                                (dt.summary == null || dt.summary == "") ? episode_summary = '-' : episode_summary = <p>{htmlToReactParser.parse(dt.summary)}</p>;

                                return <MDBListGroupItem className="border-1">

                                    <MDBRow className="d-flex"  >
                                        <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                            {season}
                                        </MDBCol>
                                        <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                            {sch_number}
                                        </MDBCol>
                                        <MDBCol xl = "2" lg = "2" md="2" sm = "2" xs = "2" className="d-flex justify-content-center">
                                            {airDate}
                                        </MDBCol>
                                        <MDBCol xl = "1" lg = "1" md="1" sm = "1" xs = "1" className="d-flex justify-content-center">
                                            {airTime}
                                        </MDBCol>
                                        <MDBCol xl = "3" lg = "3" md="3" sm = "3" xs = "3" className="d-flex justify-content-center">
                                            {episode_url}
                                        </MDBCol>
                                        <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4" className="d-flex justify-content-center">
                                            {episode_summary}
                                        </MDBCol>

                                    </MDBRow>

                                </MDBListGroupItem>
                            })
                            }
                        </MDBListGroup>

                    </div>

                </div>
            );

        }
    }




}

export default EpisodeSchedule;