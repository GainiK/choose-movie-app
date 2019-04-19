import React, { Component } from 'react';
import Movie from './components/Movie';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            page: 1,
            currentPage: null,
            totalPages: null,
            currentData: [],
        };

    }

    onPageChanged = data1 => {
        const { data } = this.state;
        const { currentPage, totalPages, pageLimit } = data1;
        const offset = (currentPage - 1) * pageLimit;
        if ((data.length - offset) < 11 * pageLimit) {
            this.setState(prevState => {
                return { page: prevState.page + 1 }
            })
        }
        const currentData = data.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentData, totalPages });
    }

    componentDidMount() {
        var arr = [];
        fetch('http://api.tvmaze.com/shows?page=' + this.state.page)
            .then(res => { return res.json() })
            .then(json => {
                json.forEach(function (obj) { if (obj != null && obj.image != null && obj.image.medium != null && obj.name != "Not Found") arr = arr.concat(obj); });
                this.setState({
                    isLoaded: true,
                    data: arr
                })
            })
    }


    componentDidUpdate(prevProps, prevState) {
        var arr = [];
        if (prevState.page != this.state.page) {
            fetch('http://api.tvmaze.com/shows?page=' + this.state.page)
                .then(res => res.json())
                .then(json => {
                    json.forEach(function (obj) { if (obj != null && obj.image != null && obj.image.medium != null) arr = arr.concat(obj); });
                    this.setState(prevState => {
                        return {
                            isLoaded: true,
                            data: prevState.data.concat(arr),
                        }
                    })
                })
        }
    }



    render() {

        var { isLoaded, data, currentData } = this.state;
        var numberOfColumns = 5;

        const totalData = data.length;

        if (totalData === 0) return null;

        if (!isLoaded) {
            return <Loading />
        } else {
            return (
                <div class="list_of_movies">
                    <div class="App" >
                        <div class="mt-4">
                            {currentData.map((dt, index) => {
                                var cN = index - numberOfColumns * Math.floor(index / numberOfColumns);
                                if (index == (currentData.length - 1) && (currentData.length % numberOfColumns) != 0) {
                                    return this.render3Movie(index, (currentData.length % numberOfColumns), this.props);
                                }
                                return cN === (numberOfColumns - 1) ? this.render3Movie(index, numberOfColumns, this.props) : '';

                            })}
                        </div>

                        <div class="pagination">
                            <div class="mx-auto" >
                                <Pagination totalRecords={totalData} pageLimit={25} onPageChanged={this.onPageChanged} totalNumber={0} />
                            </div>
                        </div>

                    </div>
                </div>

            );
        }
    }


    render3Movie(index, numEl, props) {
        var i;
        var data1 = [];
        for (i = 0; i < numEl; i++) {
            data1[i] = this.state.currentData[index - (numEl - i - 1)];
        }
        return (
            <div className="row justify-content-center" key={index} >
                {data1.map((movie) => {
                    var z = Object.assign({}, { properties: props }, { movie: movie });
                    return (
                        < Movie info={z} />
                        //<div></div>
                    );
                })}
            </div>
        );
    }

}

export default App;
