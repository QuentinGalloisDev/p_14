import React, { useContext, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { EmployeeContext } from '../Context/EmployeeProvider'; // Importer le contexte

export const EmployeeList = () => {
    // Grid.js nécessite une référence directe à un élément DOM pour initialiser ou manipuler le tableau.
    const wrapperRef = useRef(null);
    let [entries, setEntries] = useState(10);
    // Importer le theme pour l'utiliser dans le tableau
    const { employees } = useContext(EmployeeContext); // Utiliser le contexte

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
                { id: 'Department', name: 'Department' },
                { id: 'DateofBirth', name: 'Date of Birth' },
                { id: 'Street', name: 'Street' },
                { id: 'City', name: 'City' },
                { id: 'State', name: 'State' },
                { id: 'ZipCode', name: 'Zip Code' }
            ],
            data: employees.map(employee => [
                employee.firstName,
                employee.lastName,
                employee.startDate,
                employee.department,
                employee.birthDate,
                employee.street,
                employee.city,
                employee.state,
                employee.zipCode
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
    }, [employees, entries]); // Include entries in the dependency array

    return (
        <div>
            {/* <Header></Header> */}
            <select onChange={(e) => { setEntries(parseInt(e.target.value, 10)) }}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <div ref={wrapperRef} />
            {/* <Footer /> */}
        </div>
    )
}

EmployeeList.propTypes = {
    /**
     * employees: Un tableau d'objets représentant les employés.
     * Exemple :
     * [
     *   {
     *     firstName: "John",
     *     lastName: "Doe",
     *     startDate: "2021-01-01",
     *     department: "Engineering",
     *     birthDate: "1985-05-15",
     *     street: "123 Main St",
     *     city: "Springfield",
     *     state: "Illinois",
     *     zipCode: "62704"
     *   },
     *   {
     *     firstName: "Jane",
     *     lastName: "Smith",
     *     startDate: "2022-02-15",
     *     department: "Marketing",
     *     birthDate: "1990-08-20",
     *     street: "456 Elm St",
     *     city: "Shelbyville",
     *     state: "Indiana",
     *     zipCode: "46176"
     *   }
     * ]
     */
    employees: PropTypes.arrayOf(PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired
    })),

    /**
     * entries: Un nombre indiquant la limite de pagination.
     * Exemple :
     * const entries = 10; // ou 25, 50, 100 selon la sélection
     */
    entries: PropTypes.number,

    /**
     * setEntries: Une fonction pour mettre à jour la limite de pagination.
     * Exemple :
     * const setEntries = (newEntries) => {
     *   console.log('Updating entries:', newEntries);
     *   // Exemple d'utilisation avec useState:
     *   // setEntries(newEntries);
     * };
     */
    setEntries: PropTypes.func
};