import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext([]);

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployee] = useState([]);

    return (
        <EmployeeContext.Provider value={{ employees, setEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};