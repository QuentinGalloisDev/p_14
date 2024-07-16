import React, { useContext, useEffect, useState, useRef } from 'react'
import styles from '../Styles/Tab.module.css'
import { Header } from '../Componnents/Header';
import { Footer } from '../Componnents/Footer';
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { ThemeContext } from '../Context/ThemeProvider'; // Importer le contexte

export const EmployeeList = () => {
    const wrapperRef = useRef(null);
    let [entries, setEntries] = useState(10);
    // Importer le theme pour l'utiliser dans le tableau
    const { theme } = useContext(ThemeContext); // Utiliser le contexte

    useEffect(() => {
        const grid = new Grid({
            search: true,
            sort: true,
            pagination: {
                limit: entries
            },
            columns: [
                { id: 'FirstName', name: 'First Name' },
                { id: 'LastName', name: 'Last Name' },
                { id: 'StartDate', name: 'Start Date' },
                { id: 'Departement', name: 'Departement' },
                { id: 'DateofBirth', name: 'Date of Birth' },
                { id: 'Street', name: 'Street' },
                { id: 'City', name: 'City' },
                { id: 'State', name: 'State' },
                { id: 'ZipCode', name: 'Zip Code' }
            ],
            data: theme.map(employee => [
                employee.firstName,
                employee.lastName,
                employee.startDate,
                employee.departement,
                employee.birthDate,
                employee.street,
                employee.city,
                employee.state,
                employee.ZipCode
            ]),
            language: {
                noRecordsFound: 'No employee found',
            }
        });

        grid.render(wrapperRef.current);
        // Clean up function to destroy the grid instance on component unmount
        return () => {
            grid.destroy();
        };
    }, [theme, entries]); // Include entries in the dependency array

    return (
        <div>

            <Header></Header>

            <select onChange={(e) => { setEntries(parseInt(e.target.value, 10)) }}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <div ref={wrapperRef} />
            <Footer />
        </div>
    )
}
