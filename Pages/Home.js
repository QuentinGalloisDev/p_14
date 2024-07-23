import React, { useState, useContext } from 'react';
import styles from '../Styles/Home.module.css';
import { InputForm } from '../Componnents/InputForm';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { customStyles } from '../Styles/CustomStyleModal';
import { useForm, Controller } from 'react-hook-form';
import { EmployeeContext } from '../Context/EmployeeProvider'; // Importer le contexte
import { Select } from '../Componnents/Select';

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

                    <div className='adress'>
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
                            defaultValue=""
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
                        defaultValue="" // Assurez-vous que le defaultValue est configuré correctement
                        render={({ field }) => (
                            <Select
                                label='Department'
                                options={['a', 'v', 'c', 's']}
                                onChange={field.onChange}
                                value={field.value}
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
