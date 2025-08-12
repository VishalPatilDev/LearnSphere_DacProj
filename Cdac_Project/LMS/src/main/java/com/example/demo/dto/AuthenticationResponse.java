package com.example.demo.dto;


public class AuthenticationResponse {
    private String token;
    private Long userId;
    private String email;
    private String role;
    private String username;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String token, Long userId, String email, String role, String username) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.role = role;
        this.username = username;
    }

    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
