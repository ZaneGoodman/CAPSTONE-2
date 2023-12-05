import React from "react";

const mockAuth = {
  token: "your-token-value", // set a valid token for testing
  setToken: jest.fn(),
  username: "testuser", // set a valid username for testing
  setUsername: jest.fn(),
};

const AuthProvider = ({ children }) => (
  <mockAuthContext.Provider value={mockAuth}>
    {children}
  </mockAuthContext.Provider>
);

const useAuth = () => {
  const context = React.useContext(mockAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const mockAuthContext = React.createContext(mockAuth);

export { AuthProvider, useAuth };
