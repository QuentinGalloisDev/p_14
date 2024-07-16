import React from 'react'

export const InputForm = ({ labelFor, inputType, labelName, register }) => {
    return (
        <div>
            <label htmlFor={labelFor}>{labelName}</label>
            <input type={inputType} id={labelFor} {...register(labelName)} />
        </div>
    )
}
