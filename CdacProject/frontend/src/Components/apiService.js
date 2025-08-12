import authService from './authService';

class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8080/api';
  }

  // Generic fetch method with auth headers
  async fetchWithAuth(url, options = {}) {
    const config = {
      ...options,
      headers: {
        ...authService.getAuthHeaders(),
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);
      
      if (response.status === 401) {
        authService.logout();
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle empty responses
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User-related API calls
  async getCurrentUser() {
    return this.fetchWithAuth('/users/current');
  }

  async getAllUsers() {
    return this.fetchWithAuth('/users');
  }

  async getUserById(id) {
    return this.fetchWithAuth(`/users/${id}`);
  }

  // Course-related API calls
  async getAllCourses() {
    return this.fetchWithAuth('/courses');
  }

  async getCourseById(id) {
    return this.fetchWithAuth(`/courses/${id}`);
  }

  async createCourse(courseData) {
    return this.fetchWithAuth('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
  }

  async updateCourse(id, courseData) {
    return this.fetchWithAuth(`/courses/${id}`, {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
  }

  async deleteCourse(id) {
    return this.fetchWithAuth(`/courses/${id}`, {
      method: 'DELETE'
    });
  }

  // Learning-related API calls
  async getUserLearningCourses(userId) {
    return this.fetchWithAuth(`/learning/${userId}`);
  }

  async getAllEnrollments() {
    return this.fetchWithAuth('/learning');
  }

  async enrollInCourse(enrollData) {
    return this.fetchWithAuth('/learning', {
      method: 'POST',
      body: JSON.stringify(enrollData)
    });
  }

  // Assessment-related API calls
  async getUserAssessments(userId) {
    return this.fetchWithAuth(`/assessments/perfomance/${userId}`);
  }

  async submitAssessment(userId, courseId, assessmentData) {
    return this.fetchWithAuth(`/assessments/add/${userId}/${courseId}`, {
      method: 'POST',
      body: JSON.stringify(assessmentData)
    });
  }

  // Question-related API calls
  async getCourseQuestions(courseId) {
    return this.fetchWithAuth(`/questions/${courseId}`);
  }

  async addQuestion(questionData) {
    return this.fetchWithAuth('/questions', {
      method: 'POST',
      body: JSON.stringify(questionData)
    });
  }

  // Progress-related API calls
  async getProgress(userId, courseId) {
    return this.fetchWithAuth(`/progress/${userId}/${courseId}`);
  }

  async updateProgress(progressData) {
    return this.fetchWithAuth('/progress/update-progress', {
      method: 'PUT',
      body: JSON.stringify(progressData)
    });
  }
}

export default new ApiService();
