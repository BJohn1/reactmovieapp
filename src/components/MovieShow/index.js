import React, { Component } from 'react'
import './index.css';


class MovieShow extends Component{
    state={
        movie:{}
    }
    async componentDidMount(){
        const movieId = this.props.match.params.id
        const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,)

        const movieJson=await movie.json();
        this.setState({movie: movieJson})

        console.log(this.props.match.params.id)
    }
    render(){
    return <div class="card"><h1>{this.state.movie.title}</h1><br></br><div class="container"><img src={`https://image.tmdb.org/t/p/original${this.state.movie.poster_path}`} alt="movie poster" height="420" width="420"/>
    <h5>Overview:</h5><p>{this.state.movie.overview}</p></div>
    </div>
    }
}

export default MovieShow