package com.service.usermanagement.models;

public class AuthResponse {

    private String token;
    private User user;

    public AuthResponse(String token, User user) {
        this.setToken(token);
        this.setUser(user);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
