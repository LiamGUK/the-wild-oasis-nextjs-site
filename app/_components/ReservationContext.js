// When using Context API in Next.js can only be used with client components as can't use hooks in server components.
"use client";

import { createContext, useContext, useState } from "react";

// 1st step create context to store global state too using createContext hook
const ReservationContext = createContext();

const initialState = { from: null, to: null };

// 2nd step create component to hold context and to use in main app
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  // Use createContext and attach Provider to enable global store to context component - wrap around child prop so that child component will get access to state
  // pass in state variables as value prop to expose them to child components
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

// 3rd step create custom hook to easily use context variables inside child components
// Will only need to call useReservation() and destructure in component without needing to call useContext hook and pass in ReservationContext each time
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { ReservationProvider, useReservation };
