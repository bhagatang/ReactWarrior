import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from './MovieTabs';
import PageTabs from './PageTabs';
// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sortBy: "popularity.desc",
      queryPage: 1,
      currentPage: 0,
      totalPages: 0
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sortBy !== this.state.sortBy) {
      this.getMovies();
    }
    if(prevState.queryPage !== this.state.queryPage) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie/?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${this.state.sortBy}&page=${this.state.queryPage}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('data: ', data);
      this.setState({
        movies: data.results,
        currentPage: data.page,
        totalPages: data.total_pages
      })      
    })
  }

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = string => {
    this.setState({
      sortBy: string,
      queryPage: 1
    })
  }

  changePage = value => {
    this.setState({
      queryPage: value
    })
  }

  render() {
    console.log("render", this);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className='row'>
              <div className='col-12'>
                <MovieTabs 
                sortBy={this.state.sortBy} 
                updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PageTabs 
        currentPage={this.state.currentPage} 
        totalPages={this.state.totalPages}
        changePage={this.changePage}
        />
      </div>
    );
  }
}

export default App;
