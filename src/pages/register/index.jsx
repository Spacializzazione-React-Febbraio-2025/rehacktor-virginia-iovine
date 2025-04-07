// Si sono aggiunti alcuni console.log per capire se i dati immessi nel form arrivassero correttamente

import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from '../../supabase/supabase-client';
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from '../../lib/validationForm';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false); 
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
    });
    
    const onSubmit= async (event) => {
        event.preventDefault();
        console.log("Form submitted");
        console.log("Form state:", formState);
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            console.log("Error object:", error); 
        
            if (error.issues) {
                console.log('Validation error: ', JSON.stringify(error.issues, null, 2));
                const formErrors = getErrors(error);
                setFormErrors(formErrors);
                console.log('Validation failed: ', formErrors);
            } else {
                console.error('Unknown validation error', error);
            }
        } else {
            console.log('Valid data: ', data);
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.userName
                    }
                }
            });
            if (error) {
                console.error("Signup error: ", error);
                alert("Sign up error 👎🏻!");
            } else {
                alert("Signed up 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
        
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        console.log(`Error for ${property}:`, message);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };
    
    const isInvalid = (property) => {
        if (formSubmitted || touchedFields [property]) {
            return !! formErrors [property];
        }
        return undefined;
    };
    
    const setField = (property, valueSelector) => (e) => {
        const value = valueSelector ? valueSelector(e) : e.target.value;
        console.log(`${property}: ${value}`);
        setFormState((prev) => ({
            ...prev,
            [property]: value,
        }));
    };
    
    
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md mb-8">
        <form onSubmit={onSubmit} noValidate>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                />
                {formErrors.email && <small className="text-red-500">{formErrors.email}</small>}
            </div>

            <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-300">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={setField("firstName")}
                    onBlur={onBlur("firstName")}
                    className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                />
                {formErrors.firstName && <small className="text-red-500">{formErrors.firstName}</small>}
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-300">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={setField("lastName")}
                    onBlur={onBlur("lastName")}
                    className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                />
                {formErrors.lastName && <small className="text-red-500">{formErrors.lastName}</small>}
            </div>

            <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-300">Username:</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formState.userName}
                    onChange={setField("userName")}
                    onBlur={onBlur("userName")}
                    className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                />
                {isInvalid("email") && <small className="text-red-500">{formErrors.email}</small>}
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={setField("password")}
                    onBlur={onBlur("password")}
                    className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                />
                {formErrors.password && <small className="text-red-500">{formErrors.password}</small>}
            </div>

            <button
                type="submit"
                className="w-full bg-lime-400 text-white py-2 rounded-md hover:bg-lime-500 transition duration-300"
            >
                Sign Up
            </button>
        </form>
        </div>
    );
}