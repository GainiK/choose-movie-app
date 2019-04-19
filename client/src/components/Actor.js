import React, { Component } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import './Actor.scss';

const Actor = (props) => {

  var personImg, characterImg, country, birthday, deathday, cast = 0;

  (props.info.person == null || props.info.person.length == 0) ? cast = 0 : cast = 1;

  (props.info.person.image == null || props.info.person.image.medium == null) ? personImg = require('../images/personNotFound.jpg') : personImg = props.info.person.image.medium;
  (props.info.character.image == null || props.info.character.image.medium == null) ? characterImg = personImg : characterImg = props.info.character.image.medium;
  (props.info.person.country == null || props.info.person.country.name == null) ? country = "" : country = props.info.person.country.name;
  props.info.person.birthday == null ? birthday = "" : birthday = props.info.person.birthday;
  props.info.person.deathday == null ? deathday = "" : deathday = " - " + props.info.person.deathday;

  if (cast == 0) {
    return <div></div>;
  } else {
    return (
      <MDBCol xl = "4" lg = "4" md="4" sm = "4" xs = "4" key={props.info.id} align="center" >
        <MDBRow className="d-flex"
          onMouseOver={e => {
            e.currentTarget.children[1].children[0].innerHTML = "<b>" + props.info.character.name + "</b>";
            e.currentTarget.children[0].children[0].src = characterImg
          }}
          onMouseOut={e => {
            e.currentTarget.children[0].children[0].src = personImg;
            e.currentTarget.children[1].children[0].children[0].innerHTML = props.info.person.name;
          }}>

          <MDBCol xl = "5" lg = "5" md="5" sm = "5" xs = "5" key={props.info.person.name} align="center" >
            <img src={personImg} class="img"
              alt="" />
          </MDBCol>

          <MDBCol className="mt-3" xl = "7" lg = "7" md="7" sm = "7" xs = "7" key={props.info.person.id}  >
            <div>
              <b>{props.info.person.name} </b> <br></br>
              {country} <br></br>
              {birthday} {deathday}
            </div>
          </MDBCol>

        </MDBRow>

      </MDBCol>

    )
  }

}

export default Actor;