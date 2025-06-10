// main.models.ts

// Interface for the User model
export interface User {
    id: number;
    username: string;
    // Add other fields as needed
  }

  // Interface for the Project model
  export interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string; // Assuming dates are stored as strings (ISO format)
    end_date: string;   // in Django DateField
    owner: User;
    // Add other fields or relationships as needed
  }

  // Interface for the Task model
  export interface Task {
    id: number;
    project: Project;
    description: string;
    due_date: string;   // Assuming dates are stored as strings (ISO format)
    status: string;     // Status will be one of the choices ('new', 'in-progress', etc.)
    owner: User;
    // Add other fields or relationships as needed
  }

  // Interface for the Role model
  export interface Role {
    id: number;
    name: string;
    users: User[];
    // Add other fields or relationships as needed
  }
