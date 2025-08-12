package com.example.demo.security;

import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;


public class CustomUserPrincipal implements UserDetails {
    private Long userId;
    private String username;
    private String password;
    private Role role;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserPrincipal(User user) {
        this.userId = user.getId();
        this.username = user.getEmail(); // Using email as username
        this.password = user.getPassword();
        this.role = user.getRole();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Custom getters
    public Long getUserId() {
        return userId;
    }

    public Role getRole() {
        return role;
    }
}
