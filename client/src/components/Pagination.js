import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const LEFT_ONE = 'LEFT_ONE';
const RIGHT_ONE = 'RIGHT_ONE';
const LEFT_PAGE_DISABLED = 'LEFT_DISABLED';
const RIGHT_PAGE_DISABLED = 'RIGHT_DISABLED';
const LEFT_ONE_DISABLED = 'LEFT_ONE_DISABLED';
const RIGHT_ONE_DISABLED = 'RIGHT_ONE_DISABLED';


const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}



class Pagination extends Component {

  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit, totalNumber } = props;
    this.totalNumber = totalNumber;
    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 25;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    this.state = { currentPage: 1, totalRecords: this.totalRecords };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ totalRecords: nextProps.totalRecords });
  }

  fetchPageNumbers = () => {

    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = (Math.floor((currentPage - 1) / 10) + 1) * 10;
    let pages = range(startPage, endPage);

    if (this.totalNumber == 1) {
      return range(1, totalPages);
    }

    const hasLeftSpill = startPage > 10;
    const hasRightSpill = (totalPages - endPage) > 1;
    const hasLeftOne = currentPage > 1;
    const hasRightOne = (totalPages - endPage) > 1;

    let pages1 = [];
    if (hasLeftSpill) {
      pages1 = [LEFT_PAGE];
    } else {
      pages1 = [LEFT_PAGE_DISABLED];
    }
    if (hasLeftOne) {
      pages1 = pages1.concat([LEFT_ONE]);
    } else {
      pages1 = pages1.concat([LEFT_ONE_DISABLED]);
    }
    pages1 = pages1.concat([...pages]);
    if (hasRightOne) {
      pages1 = pages1.concat([RIGHT_ONE]);
    } else {
      pages1 = pages1.concat([RIGHT_ONE_DISABLED]);
    }
    if (hasRightSpill) {
      pages1 = pages1.concat([RIGHT_PAGE]);
    } else {
      pages1 = pages1.concat([RIGHT_PAGE_DISABLED]);
    }

    return [...pages1];

  }


  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page) => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = page;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.setState({ totalRecords: this.props.totalRecords });
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.props.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  }

  handleMoveLeft = evt => {
    evt.preventDefault();
    const startPage = this.state.currentPage - 10;
    this.gotoPage(startPage);
  }

  handleMoveRight = evt => {
    evt.preventDefault();
    const endPage = this.state.currentPage + 10;
    this.gotoPage(endPage);
  }

  handleMoveLeftOne = evt => {
    evt.preventDefault();
    const startPage = this.state.currentPage - 1;
    this.gotoPage(startPage);
  }

  handleMoveRightOne = evt => {
    evt.preventDefault();
    const endPage = this.state.currentPage + 1;
    this.gotoPage(endPage);
  }

  render() {

    this.totalPages = Math.ceil(this.state.totalRecords / this.pageLimit);
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();
    //if (this.totaRecords === 0) return null;

    return (

      <Fragment>
        <nav>
          <ul className="pagination">
            {pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );
              if (page === LEFT_PAGE_DISABLED) return (
                <li key={index} className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

              if (page === LEFT_ONE) return (

                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Left Align" onClick={this.handleMoveLeftOne}>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                  </a>
                </li>
              );

              if (page === LEFT_ONE_DISABLED) return (

                <li key={index} className="page-item disabled" >
                  <a className="page-link" href="#" aria-label="Left Align" onClick={this.handleMoveLeftOne}>
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                  </a>
                </li>
              );

              if (page === RIGHT_ONE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" onClick={this.handleMoveRightOne}>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>

                  </a>
                </li>
              );

              if (page === RIGHT_ONE_DISABLED) return (
                <li key={index} className="page-item disabled">
                  <a className="page-link" href="#" onClick={this.handleMoveRightOne}>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>

                  </a>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

              if (page === RIGHT_PAGE_DISABLED) return (
                <li key={index} className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

              return (
                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                  <a className="page-link" href="#" onClick={this.handleClick(page)}>{page}</a>
                </li>
              );

            })}

          </ul>
        </nav>
      </Fragment>
    );

  }

}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
