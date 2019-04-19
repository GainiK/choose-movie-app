import React from 'react'
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import './Movies.scss';
import Actor from './components/Actor';
import Pagination from './components/Pagination';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Loading from './components/Loading'

class Movies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      actors: [],
      actL: 0,
      isLoaded: false,
      currentPage: null,
      totalPages: null,
      currentData: [],
      episodes: [],
      parameters: this.props.match.params,
      value: '',
      buttonText: 'Add to Watch List'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleWatchListButtonClick() {
    if (this.state.buttonText == 'Add to Watch List') {
      const response = fetch('/api/watchlist/' + this.state.data.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: this.state.value }),
      });
      this.setState({
        value: "",
        buttonText: "Remove from Watch List"
      });
    } else {
      fetch(('/api/watchlist/' + this.state.data.id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      this.setState({
        value: "",
        buttonText: "Add to Watch List"
      });
    }

  }

  onPageChanged = data1 => {
    const { actors } = this.state;
    const { currentPage, totalPages, pageLimit } = data1;
    const offset = (currentPage - 1) * pageLimit;
    const currentData = actors.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentData, totalPages });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  componentDidMount() {

    fetch('http://api.tvmaze.com/shows/' + this.state.parameters.id)
      .then(res => res.json())
      .then(json => {

        this.setState({
          isLoaded: true,
          data: json
        });
      })

    fetch('http://api.tvmaze.com/shows/' + this.state.parameters.id + '/cast')
      .then(res => res.json())
      .then(json => {
        if (json.length != 0) {
          this.setState({
            actL: 1
          });

        }
        this.setState({
          isLoaded: true,
          actors: json,
        });
      })

    const response = (fetch('/api/watchlist/' + this.state.parameters.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(res => res.json())
      .then(json => {
        if (json.cont == true) {
          this.setState({ buttonText: "Remove from Watch List" })
        }
      }));


  }



  render() {

    var { data, isLoaded, actors, currentData, actL, buttonText } = this.state;
    var input_text = <input value={this.state.value} type="text" class="text_input" onChange={this.handleChange}></input>;

    var HtmlToReactParser = require('html-to-react').Parser;
    var htmlToReactParser = new HtmlToReactParser();

    var numberOfColumns = 3;

    const totalData = actors.length;
    if (totalData == 0 && actL == 1) return null;

    if (!isLoaded) {
      return <Loading />
    } else {
      var runtime;
      var summary, country, language, genres, premiere, status, rating, officialSite, runtime, schedule_days, schedule_time, type, img, actor_h;
      (data.network == null || data.network.country == null || data.network.country.name == null) ? country = '-' : country = data.network.country.name;
      data.language == null ? language = '-' : language = data.language;
      (data.genres == null || data.genres.length == 0) ? genres = "-" : genres = data.genres.join(", ");
      data.premiered == null ? premiere = '-' : premiere = data.premiered;
      data.type == null ? type = '' : type = <div>( {data.type} ) </div>;
      data.status == null ? status = '' : status = <div>( {data.status} )</div>;
      (data.rating == null || data.rating.average == null) ? rating = '-' : rating = data.rating.average;
      data.officialSite == null ? officialSite = '-' : officialSite = <a href={data.officialSite}>Link</a>;
      data.runtime == null ? runtime = '-' : runtime = data.runtime;
      (data.schedule == null || data.schedule.days == null || data.schedule.days.length == 0) ? schedule_days = '-' : schedule_days = <div>Every {data.schedule.days.join(", ")}</div>;
      (data.schedule == null || data.schedule.time == null) ? schedule_time = '' : schedule_time = (<div> at {data.schedule.time}</div>);
      (data.image == null || data.image.medium == null) ? img = require('./images/unfoundMovie.png') : img = data.image.medium;
      (totalData == 0) ? actor_h = '' : actor_h = <h3>Actors</h3>;
      data.summary == null ? summary = '' : summary = <div><h3>Description</h3><p>{htmlToReactParser.parse(this.state.data.summary)}</p></div>;
      
      if (buttonText == "Remove from Watch List") {
        input_text = '';
      }

      return (

        <div class="div_center " >
          <div className="px-2 mb-4">
            <h1><b>{data.name}</b></h1>

            <MDBRow className="d-flex">

              <MDBCol xl = "3" lg = "3" md="3" sm = "3" xs = "3" key={img} align="center" >
                <img src={img} className="img-fluid ml-4 mt" class="img"
                  alt="" />

                <div className="mt-2">
                  {input_text}
                  <Button class="watchlist_button mt-1" onClick={() => this.handleWatchListButtonClick(data.id)}
                  >
                    {this.state.buttonText}
                  </Button>
                </div>


              </MDBCol>

              <MDBCol xl = "6" lg = "6" md="6" sm = "6" xs = "6" className="offset-md-1" key={data.id} align="center" >

                <div class="list">
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
                    <dd class="col-sm-9">{schedule_days} {schedule_time}
                      <p><Link to={'/episodes_schedule/' + this.state.parameters.id}>Episodes Schedule</Link></p>
                    </dd>
                  </dl>
                </div>
              </MDBCol>

            </MDBRow>


            <div class="description">
              {summary}
            </div>

            <div class="description">
              {actor_h}
              <div>
                {currentData.map((act, index) => {
                  var cN = index - numberOfColumns * Math.floor(index / numberOfColumns);
                  if (index == (currentData.length - 1) && (currentData.length % numberOfColumns) != 0) {
                    return this.render3Actors(index, (currentData.length % numberOfColumns));
                  }
                  return cN === (numberOfColumns - 1) ? this.render3Actors(index, numberOfColumns) : '';

                })}
              </div>
            </div>

            <div className="row justify-content-center">
              <Pagination totalRecords={totalData} pageLimit={12} onPageChanged={this.onPageChanged} totalNumber={1} />
            </div>
          </div>
        </div>


      )

    }
  }

  render3Actors(index, numEl) {
    var i;
    var data1 = [];
    for (i = 0; i < numEl; i++) {
      data1[i] = this.state.currentData[index - (numEl - i - 1)];
    }

    return (
      <div className="row ml-1 mt-2" key={index} >
        {
          data1.map((actor) => {

            return (
              < Actor info={actor} />
            );
          })}
      </div>
    );

  }


}

export default Movies;