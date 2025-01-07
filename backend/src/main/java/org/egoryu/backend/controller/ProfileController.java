package org.egoryu.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.egoryu.backend.dto.PortfolioItemRequest;
import org.egoryu.backend.dto.TicketRequest;
import org.egoryu.backend.dto.UserRequest;
import org.egoryu.backend.entity.Users;
import org.egoryu.backend.service.ProfileService;
import org.egoryu.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    @GetMapping("/")
    public UserRequest getProfile() {
        return modelMapper.map(userService.getCurrentUser(), UserRequest.class);
    }

    @PutMapping("/")
    public UserRequest updateProfile(@RequestBody @Valid UserRequest request) {
        return modelMapper.map(userService.update(request), UserRequest.class);
    }

    @GetMapping("/portfolio/")
    public List<PortfolioItemRequest> getPortfolio() {
        return profileService.getPortfolio();
    }

    @PostMapping("/ticket/")
    public String createTicket(@RequestBody TicketRequest request) {
        return profileService.createTicket(request.getTitle(), request.getContent());
    }
}
