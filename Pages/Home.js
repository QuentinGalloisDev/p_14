import React, { useState, useContext } from 'react'
import styles from '../Styles/Home.module.css'
import { Header } from '../Componnents/Header';
import { Footer } from '../Componnents/Footer';
import { InputForm } from '../Componnents/InputForm';
import {
    Link
} from "react-router-dom";
import Modal from 'react-modal';
import '@vaadin/date-picker';
import { customStyles } from '../Styles/CustomStyleModal'
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../Context/ThemeProvider'; // Importer le contexte


export const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const { handleSubmit, register } = useForm();
    // On utilise useContext pour accéder au contexte défini dans le ThemeProvider.
    const { theme, setTheme } = useContext(ThemeContext);
    const onSubmit = (data) => {
        // Stocker un objet dans le context en itérant sur l'objet récupérer dans le hook form
        setTheme(prevTheme => [...prevTheme, data]);
        console.log(data)

    }
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        // Le theme dans le provider correspond à la variable d'état qui est dans le fichier ThemeProvider.js
        <ThemeContext.Provider value={theme}>
            <div className={styles.container}>
                <Name />
                <Header></Header>
                {/* Lorsque le formulaire est soumis, handleSubmit appelle la fonction onSubmit avec les données du formulaire (data) */}
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
                    {/* Mettre 2 date picker ici  */}
                    <div className={styles.date_picker}>
                        <vaadin-date-picker label="Date de naissance" initialPosition="Start date" clear-button-visible {...register("birthDate")}></vaadin-date-picker>
                        <vaadin-date-picker label="Date de début" initialPosition="Start date" clear-button-visible {...register("startDate")}></vaadin-date-picker>
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

                        {/* Mettre le select avec les états ici */}

                        <InputForm
                            labelName='ZipCode'
                            inputType='number'
                            labelFor='zip_code'
                            register={register}
                        />
                    </div>
                    {/* Mettre le select avec les départements ici */}

                    <div >Home</div>
                    <Link to='employee-list'>Employee List</Link>
                    <button onClick={handleOpenModal}>Save Employee</button>
                    <Modal
                        isOpen={showModal}
                        contentLabel="Minimal Modal Example"
                        style={customStyles}
                        appElement={document.getElementById('root')}
                    >
                        <p>Employee created !</p>
                        <button onClick={handleCloseModal}>Close Modal</button>
                    </Modal>
                </form>

                <Footer />
            </div>
        </ThemeContext.Provider>

    )
}

export const Name = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div>
            {theme && theme.length > 0 ? <p>{theme[theme.length - 1].firstName}</p> : <p>No employees yet</p>}
        </div>
    );
};