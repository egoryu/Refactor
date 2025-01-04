package org.egoryu.backend.service;

import lombok.RequiredArgsConstructor;
import org.egoryu.backend.dto.UserRequest;
import org.egoryu.backend.entity.Portfolio;
import org.egoryu.backend.entity.Users;
import org.egoryu.backend.repository.PortfolioRepository;
import org.egoryu.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final ModelMapper modelMapper;

    public Users save(Users user) {
        return repository.save(user);
    }


    public Users create(Users user) {
        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }

        user.setRegistrationDate(new Timestamp(System.currentTimeMillis()));

        return save(user);
    }

    public Users update(UserRequest request) {
        Optional<Users> usersOptional = repository.findByEmail(request.getEmail());

        if (usersOptional.isEmpty()) {
            throw new RuntimeException("Пользователь с таким email не существует");
        }

        Users user = usersOptional.get();
        user.setAge(request.getAge());
        user.setName(request.getName());
        user.setCountry(request.getCountry());
        user.setPhone(request.getPhone());
        user.setSurname(request.getSurname());

        return save(user);
    }

    public Users getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public UserDetailsService userDetailsService() {
        return this::getByEmail;
    }

    public Users getCurrentUser() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();

        return getByEmail(email);
    }
}
