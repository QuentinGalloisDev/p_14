import React, { useState, useContext } from 'react';
import styles from '../Styles/Home.module.css';
import PropTypes from 'prop-types';
import { InputForm } from '../Componnents/InputForm';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { customStyles } from '../Styles/CustomStyleModal';
import { useForm, Controller } from 'react-hook-form';
import { EmployeeContext } from '../Context/EmployeeProvider'; // Importer le contexte
// import { Select } from '../Componnents/Select';

// test compo importé
import { Select } from 'react-select-component-animated/dist/Select';

export const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const { handleSubmit, control, register } = useForm();
    const { employees, setEmployee } = useContext(EmployeeContext);

    const onSubmit = (data) => {
        setEmployee(prevEmployee => [...prevEmployee, data]);
        console.log(data);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <EmployeeContext.Provider value={employees}>
            <div className={styles.container}>
                <form className={styles.createEmployee} onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        labelName='firstName'
                        inputType='text'
                        labelFor='first_name'
                        register={register}
                    />
                    <InputForm
                        labelName='lastName'
                        inputType='text'
                        labelFor='last_name'
                        register={register}
                    />
                    <div className={styles.date_picker}>
                        <DatePicker label="Date de naissance" initialPosition="Start date" clear-button-visible {...register("birthDate")} />
                        <DatePicker label="Date de début" initialPosition="Start date" clear-button-visible {...register("startDate")} />
                    </div>

                    <div className={styles.adress}>
                        <InputForm
                            labelName='street'
                            inputType='text'
                            labelFor='street'
                            register={register}
                        />
                        <InputForm
                            labelName='city'
                            inputType='text'
                            labelFor='city'
                            register={register}
                        />
                        <Controller
                            name="state"
                            control={control}
                            defaultValue="" // Assurez-vous que le defaultValue est configuré comme une string vide
                            render={({ field }) => (
                                <Select
                                    label='State'
                                    options={['a', 'b', 'c', 'd']}
                                    searchInput={true}
                                    fadeInDuration={'1.5s'}
                                    fadeOutDuration={'1.5s'}
                                    debounceDelay={2500}
                                    onChange={field.onChange}
                                    value={field.value}
                                />

                            )}

                        />

                        <InputForm
                            labelName='zipCode'
                            inputType='number'
                            labelFor='zip_code'
                            register={register}
                        />
                    </div>

                    <Controller
                        name="department"
                        control={control}
                        defaultValue="" // Assurez-vous que le defaultValue est configuré comme une string vide
                        render={({ field }) => (
                            <Select
                                label='Department'
                                options={['a', 'v', 'c', 's']}
                                onChange={field.onChange}
                                value={field.value}
                                searchInput={true}
                                fadeInDuration={'1.5s'}
                                fadeOutDuration={'1.5s'}
                                debounceDelay={2500}
                            />
                        )}
                    />

                    <div>Home</div>
                    <Link to='employee-list'>Employee List</Link>
                    <button type="submit" onClick={handleOpenModal}>Save Employee</button>
                    <Modal
                        isOpen={showModal}
                        contentLabel="Minimal Modal Example"
                        style={customStyles}
                        appElement={document.getElementById('root')}
                    >
                        <p>Employee created!</p>
                        <button onClick={handleCloseModal}>Close Modal</button>
                    </Modal>
                </form>
            </div>
        </EmployeeContext.Provider>
    );
};

Home.propTypes = {
    /**
     * employees: Un tableau d'objets représentant les employés.
     * Exemple :
     * [
     *   {
     *     firstName: "John",
     *     lastName: "Doe",
     *     birthDate: "1985-05-15",
     *     startDate: "2021-01-01",
     *     street: "123 Main St",
     *     city: "Springfield",
     *     state: "Illinois",
     *     zipCode: "62704",
     *     department: "Engineering"
     *   },
     *   {
     *     firstName: "Jane",
     *     lastName: "Smith",
     *     birthDate: "1990-08-20",
     *     startDate: "2022-02-15",
     *     street: "456 Elm St",
     *     city: "Shelbyville",
     *     state: "Indiana",
     *     zipCode: "46176",
     *     department: "Marketing"
     *   }
     * ]
     */
    employees: PropTypes.arrayOf(PropTypes.object),

    /**
     * setEmployee: Une fonction pour mettre à jour la liste des employés.
     * Exemple :
     * const setEmployee = (newEmployees) => {
     *   console.log('Updating employees:', newEmployees);
     * };
     */
    setEmployee: PropTypes.func,

    /**
     * showModal: Un booléen indiquant si la modal est visible.
     * Exemple :
     * const showModal = true; // ou false selon l'état
     */
    showModal: PropTypes.bool,

    /**
     * handleSubmit: Une fonction de gestion de soumission du formulaire.
     * Exemple :
     * const handleSubmit = (callback) => {
     *   return (event) => {
     *     event.preventDefault();
     *     const formData = {
     *       firstName: "John",
     *       lastName: "Doe",
     *       birthDate: "1985-05-15",
     *       startDate: "2021-01-01",
     *       street: "123 Main St",
     *       city: "Springfield",
     *       state: "Illinois",
     *       zipCode: "62704",
     *       department: "Engineering"
     *     };
     *     callback(formData);
     *   };
     * };
     */
    handleSubmit: PropTypes.func,

    /**
     * control: Un objet pour contrôler les éléments du formulaire.
     * Exemple :
     * const control = {
     *   someControlMethod: () => {
     *     console.log('Control method called');
     *   }
     * };
     */
    control: PropTypes.object,

    /**
     * register: Une fonction pour enregistrer les champs de formulaire.
     * Exemple :
     * const register = (name, options) => {
     *   return {
     *     name,
     *     onChange: (event) => {
     *       console.log(`${name} changed:`, event.target.value);
     *     },
     *     ...options
     *   };
     * };
     */
    register: PropTypes.func
};
