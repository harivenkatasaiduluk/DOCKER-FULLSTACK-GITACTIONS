package com.example.movie.service;

import com.example.movie.model.Movie;
import com.example.movie.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public Movie updateMovie(Long id, Movie movie) {
        return movieRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(movie.getTitle());
                    existing.setDirector(movie.getDirector());
                    existing.setYear(movie.getYear());
                    existing.setGenre(movie.getGenre());
                    return movieRepository.save(existing);
                })
                .orElseGet(() -> {
                    movie.setId(id);
                    return movieRepository.save(movie);
                });
    }

    @Override
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
