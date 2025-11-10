'use client'

import { useState, useEffect } from "react";
import { VscEye } from "react-icons/vsc";

function SignIn() {

    const [showPass, setShowPass] = useState(true)
    const [formData, setFormData] = useState({
        email : "",
        password: ""
    })

    interface formFinal{
        email : string,
        password : string
    }

    const [formFinal, setFormFinal] = useState<formFinal | null>(null);
    const[error, setError] = useState("");

    useEffect(() =>{
        if(formFinal){
        fetch('http://localhost:4000/user/signin', {
            method : "POST",
            headers : {
                "Type-Content" : "application/json"
            },
            body: JSON.stringify(formFinal)
        })
        .then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }}, [formFinal])

    const emailRegex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+');
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$');

    function checkForm(){
        if(emailRegex.test(formData.email)){
            if(passwordRegex.test(formData.password)){
                let finalForm = {
                    email : formData.email,
                    password : formData.password
                }
                setFormFinal(finalForm)
            } else{
                setError("Votre mot de passe dVotre mot de passe doit comporter 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spéciale au minimum.")
            }
        } else {
            setError("Votre email ne correspond pas au format demandé.")
        }
    }
    return ( 
        <>
            <html>
                <body>

                    <h1>Se connecter</h1>

                    <form onSubmit={(e) =>{ e.preventDefault();
                        checkForm();
                    }}>

                        <input 
                        type="email" 
                        name="email" 
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email : e.target.value})}
                        required
                        />

                        <input 
                        type={showPass ? "password" : "text"} 
                        name="password" 
                        placeholder="mot de passe" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password : e.target.value})}
                        required
                        />
                        <div onClick={() => setShowPass(!showPass)}>
                            <VscEye />
                        </div>

                        <button type="submit">
                            soumettre
                        </button>
                    </form>
                </body>
            </html>
        </>
     );
}

export default SignIn;