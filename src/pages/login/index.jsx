// Si sono aggiunti alcuni console.log per capire se i dati immessi nel form arrivassero correttamente

import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from '../../supabase/supabase-client';
import {
    FormSchemaLogin,
    ConfirmSchemaLogin,
    getErrors,
    getFieldError,
} from '../../lib/validationForm';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false); 
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();

        
        console.log("Email:", formState.email);
        console.log("Password:", formState.password);

        
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
            
        } else {
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            
            if (error) {
                console.error("Supabase authentication error:", error);
                alert("Signing in error 👎🏻!");
            } else {
                alert("Signed In 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");

                // forzatura ScrollToBottom
                setTimeout(() => {
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                  }, 100);
                  

                // per aggiornare subito dopo l'inserimento dei dati di login lo stato della sidebar
                await getSession();
            }
        }
    };
    
    const onBlur = (property) => () => {
        const message = getFieldError(FormSchemaLogin, property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };
    
    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };
    
    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
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
        aria-invalid={isInvalid("email")}
        className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
        required
        />
        {formErrors.email && <small className="text-red-500">{formErrors.email}</small>}
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
        aria-invalid={isInvalid("password")}
        className="mt-1 p-2 w-full border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
        required
        />
        {formErrors.password && <small className="text-red-500">{formErrors.password}</small>}
        </div>
        
        <button
        type="submit"
        className="w-full bg-lime-400 text-white py-2 rounded-md hover:bg-lime-500 transition duration-300"
        >
        Sign In
        </button>
        </form>
        </div>
    );
}
