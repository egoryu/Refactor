package org.egoryu.backend.service;

import lombok.RequiredArgsConstructor;
import org.egoryu.backend.auth.JwtService;
import org.egoryu.backend.dto.JwtResponse;
import org.egoryu.backend.dto.SignUser;
import org.egoryu.backend.entity.Role;
import org.egoryu.backend.entity.Users;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public JwtResponse signUp(SignUser request) {

        var user = Users.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userService.create(user);

        var jwt = jwtService.generateToken(user);
        return new JwtResponse(jwt);
    }

    public JwtResponse signIn(SignUser request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getEmail());

        var jwt = jwtService.generateToken(user);
        return new JwtResponse(jwt);
    }

    public JwtResponse reSignIn() {
        var user = userService.getCurrentUser();
        var jwt = jwtService.generateToken(user);

        return new JwtResponse(jwt);
    }
}
