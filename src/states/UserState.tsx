import { useReducer } from 'react'
import UserReducer from '../reducers/UserReducer'
import UserContext from '../contexts/UserContext'
import type StateInterface from '../types/StateInterface'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getFirebaseErrorMessage } from '../utils/firebaseErrors'

export default function UserState({ 
    children
}: StateInterface) {
    const initialState = {
        users: []
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const createUser = async (values: any)=> {
        try {
            const userCred = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            await updateProfile(userCred.user, {
                displayName: values.username,
            });

            await setDoc(doc(db, "users", userCred.user.uid), {
                uid: userCred.user.uid,
                displayName: values.username,
                email: values.email,
                role: 'user',
                createdAt: serverTimestamp(),
            });

            toast.success('Kayıt başarılı');
            return true;
        }catch (err: any) {
            const code: string = err.code || err.message;
            const message = getFirebaseErrorMessage(code);
            toast.error(message)
            return false;
        }
    }

    return (
        <UserContext.Provider value={{
            users: state.users,
            createUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}
