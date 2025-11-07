'use client';

import { useRouter } from "next/navigation";

function Landing() {

    const router = useRouter();

    const handleRoute = () => {
        router.push('/dashboard')
    }

    return (  
        <>
            <html>
                <body>
                    <h1>Habitly</h1>

                    <button type="button" onClick={handleRoute}>
                        Dashboard
                    </button>
                </body>
            </html>
        </>
    );
}

export default Landing;