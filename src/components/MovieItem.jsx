import React from "react";

class MovieItem extends React.Component {
  state = {
    willWatch: false
  };

    addToWatch = () => {
    this.setState({
      willWatch: true
    });
    this.props.addMovieToWillWatch(this.props.data);
  }

  removeFromWillWatch = () => {
    this.setState({
      willWatch: false
    });
    this.props.deleteMovieFromWillWatch(this.props.data);
  }

  render() {
    const {
      data,
      deleteMovie
    } = this.props;

  const Remove = () => {
    return (
      <button 
      type="button"
      className="btn btn-secondary" 
      onClick={this.removeFromWillWatch}
      >
        Remove
      </button>
    )
  };

  const WillWatch = () => {
    return (
      <button 
      type='button'
      className='btn btn-secondary'
      onClick={this.addToWatch}
      >
        Will Watch
      </button>
    )
  };

    // props.data = {};
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path ||
            data.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {data.vote_average}</p>
            {this.state.willWatch ? Remove() : WillWatch()}
          </div>
          <button
            type="button"
            onClick={() => {
              deleteMovie(data);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default MovieItem;
