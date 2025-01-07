package org.egoryu.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.egoryu.backend.dto.JwtResponse;
import org.egoryu.backend.dto.SignUser;
import org.egoryu.backend.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Аутентификация")
public class AuthController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "Регистрация пользователя")
    @PostMapping("/register")
    public JwtResponse signUp(@RequestBody @Valid SignUser request) {
        return authenticationService.signUp(request);
    }

    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/login")
    public JwtResponse signIn(@RequestBody @Valid SignUser request) {
        return authenticationService.signIn(request);
    }

    @Operation(summary = "Обновления токена для пользователя")
    @GetMapping("/refresh")
    public JwtResponse reSignIn() {
        return authenticationService.reSignIn();
    }
}
