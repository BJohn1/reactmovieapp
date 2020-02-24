import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MovieSearch extends Component{
    state={
        search:'',
        movies:[],
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = async e => {
        e.preventDefault()
        const {search}=this.state;
        try{
            const movie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=true`)
            const movieJson = await movie.json()
            console.log(movieJson);
            this.setState({
                movies: movieJson.results,
            });
        }catch(error){
            console.log(error)
        }
    }

    render(){
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input onSubmit={this.handleSubmit} placeholder='movie title' value={this.state.search} name='search' onChange={this.handleChange}/>
                <button type='submit'>Search</button>
            </form>
            {this.state.movies.map((m,i) => (
                <div><Link to={`/movies/${m.id}`}key={i}>{m.title}<br></br></Link>
                <img src={`https://image.tmdb.org/t/p/original${m.poster_path}`} alt="movie poster" height="420" width="420"/></div>
            ))}
        </div>
        )
    }
} 

export default MovieSearch