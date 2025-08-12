class AuthService {
  constructor() {
    this.baseURL = 'http://localhost:8080/api/users';
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Get user role from localStorage
  getUserRole() {
    return localStorage.getItem('role');
  }

  // Get user ID from localStorage
  getUserId() {
    return localStorage.getItem('userId');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  // Check if token is expired (basic check)
  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Create authorization headers
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Check if user has required role
  hasRole(requiredRole) {
    const userRole = this.getUserRole();
    if (requiredRole === 'ADMIN') {
      return userRole === 'ADMIN';
    } else if (requiredRole === 'INSTRUCTOR') {
      return userRole === 'ADMIN' || userRole === 'INSTRUCTOR';
    } else if (requiredRole === 'STUDENT') {
      return userRole === 'ADMIN' || userRole === 'INSTRUCTOR' || userRole === 'STUDENT';
    }
    return false;
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('profileImage');
  }
}

export default new AuthService();