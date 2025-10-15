package com.example.movie.service;

import com.example.movie.model.Movie;
import java.util.List;
import java.util.Optional;

public interface MovieService {
    Movie saveMovie(Movie movie);
    List<Movie> getAllMovies();
    Optional<Movie> getMovieById(Long id);
    Movie updateMovie(Long id, Movie movie);
    void deleteMovie(Long id);
}
