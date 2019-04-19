import React, { Component } from 'react';
import './Movie.scss'
import { MDBMask, MDBView, MDBCol } from "mdbreact";


const Movie = (props) => {

  var movieRating = '';
  (props.info.movie == null || props.info.movie.rating == null || props.info.movie.rating.average == null) ? movieRating = '' : movieRating = <p><i class="fa fa-heart" aria-hidden="true"></i> {props.info.movie.rating.average}</p>

  const imageClick = () => {
    props.info.properties.history.push('/movie/'.concat(props.info.movie.id));

  }

  return (

    <MDBCol xl = "2" lg = "2" md="2" sm = "2" xs = "2" key={props.info.id} class='mt-2 mr-2' align="center" >
      <figure >
        <div onClick={() => imageClick()}>
          <MDBView hover zoom >
            <img src={props.info.movie.image.medium} className="img-fluid"
              alt="" />

            <MDBMask className="flex-center" overlay="grey-strong" >
              <div>
                <p class="movie_desc" ><b>{props.info.movie.genres} </b></p>
                {movieRating}
              </div>
            </MDBMask>
          </MDBView>
        </div>
        <figcaption>
          <b><strong>{props.info.movie.name}</strong></b>
        </figcaption>
      </figure>
    </MDBCol>

  )
}

export default Movie;

