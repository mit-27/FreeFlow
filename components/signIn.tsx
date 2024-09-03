"ues client"

import React, { useState } from 'react'
import { handlePasskeyRegistration } from "freestyle-auth/passkey";
import type { AuthCS } from "../cloudstate/auth";
import { useCloud } from "freestyle-sh";
import { Button } from './ui/button';

const SignIn = () => {

    const [username,setUserName] = useState<string>("");
    // const router = useRouter();
    const auth = useCloud<typeof AuthCS>("auth");


    const onLogin = async () => {
        if(username==="") return;
        // get passkey generation options
        const options = await auth.startRegistration(username);

        // create a passkey in the browser
        const passkey = await handlePasskeyRegistration(options);

        // register the passkey with the server
        await auth.finishRegistration(passkey);

        // router.replace('/app');

    }



  return (
    <div>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />

        <Button onClick={() => onLogin()}>Login</Button>

    </div>
  )
}

export default SignIn