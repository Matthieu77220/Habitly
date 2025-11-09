'use client'

import { useState, useEffect } from "react";
import { VscEye } from "react-icons/vsc";

function SignUp() {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name:"",
        email: "",
        phone: "",
        password:"",
        confirm:""
    })

    const [showPass, setShowPass] = useState(true)

    interface formFinal {
        first_name : string,
        last_name : string,
        email : string,
        phone :string,
        password : string
    }
    const [formFinal, setFormFinal] = useState<formFinal | null>(null);
    const [error, setError] = useState("");

    const nameRegex = new RegExp('^(?!.*[A-Z].*[A-Z].*[A-Z])(?!.*-.*-)[A-Za-z-]+$');
    const emailRegex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+');
    const phoneRegex = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$');

    useEffect(() =>{
        fetch('http://localhost:4000/user/signup',)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }, [formFinal])
    

    function checkForm(){
        if(nameRegex.test(formData.first_name)){
            if(nameRegex.test(formData.last_name)){
                if(emailRegex.test(formData.email)){
                    if(phoneRegex.test(formData.phone)){
                        if(passwordRegex.test(formData.password)){
                            let finalForm = {
                                first_name : formData.first_name,
                                last_name : formData.last_name,
                                email : formData.email,
                                phone : formData.phone,
                                password : formData.password
                            }
                            setFormFinal(finalForm);
                        } else {
                            setError("Votre mot de passe doit comporter 12 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spéciale au minimum.")
                        }
                    } else {
                        setError("Votre numéro de téléphone ne correspond pas au format demandé.")
                    }
                } else {
                    setError("Votre email ne correspond pas au format demandé.")
                }
            } else{
                setError("Votre nom ne correspond pas au format demandé.")
            }
        } else {
            setError("Votre prénom ne correspond pas au format demandé.")
        }
    }

    return ( 

        <>
            <html>
                <body>
                    
                    <h1>S'inscrire</h1>

                    <form 
                    onSubmit={(e) =>{ e.preventDefault();
                    checkForm();
                    }}
                    >

                        <input 
                        type="text" 
                        name="first_name"
                        placeholder="prénom"
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name : e.target.value})}
                        required
                        />

                        <input 
                        type="text" 
                        name="last_name"
                        placeholder="nom"
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name : e.target.value})}
                        required
                        />

                        <input 
                        type='tel' 
                        name="phone"
                        placeholder="numéro de téléphone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone : e.target.value})}
                        required
                        />

                        <input 
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email : e.target.value})}
                        required
                        />

                        <div>
                            <input 
                            type={showPass ? 'password' : 'text'}
                            name="password"
                            placeholder="mot de passe"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password : e.target.value})}
                            required
                            />
                            <div onClick={() => setShowPass(!showPass)}>
                                <VscEye />
                            </div>
                        </div>

                        <input 
                        type={showPass ? 'password' : 'text'}
                        name="confirm"
                        placeholder="confirmer votre mot de passe"
                        value={formData.confirm}
                        onChange={(e) => setFormData({...formData, confirm : e.target.value})}
                        required
                        />
                        <div onClick={() => setShowPass(!showPass)}>
                            <VscEye />
                        </div>

                        <button 
                        type="submit"
                        > 
                        Soumettre
                        </button>

                    </form>

                </body>
            </html>
        </>
     );
}

export default SignUp;