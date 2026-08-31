import {
  StrictMode
} from "react";

import {
  createRoot
} from "react-dom/client";

import App from "./App";

import {
  AuthProvider
} from "./context/AuthContext";

import {
  BookingProvider
} from "./context/BookingContext";

import "./index.css";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>

    <AuthProvider>

      <BookingProvider>

        <App />

      </BookingProvider>

    </AuthProvider>

  </StrictMode>
);