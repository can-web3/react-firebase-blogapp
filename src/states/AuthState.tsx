import { useEffect, useReducer, useState } from 'react'
import type StateInterface from '../types/StateInterface'
import { toast } from 'react-toastify'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { getFirebaseErrorMessage } from '../utils/firebaseErrors'
import AuthContext from '../contexts/AuthContext'
import AuthReducer from '../reducers/AuthReducer'
import { doc, getDoc } from 'firebase/firestore'

export default function AuthState({ 
    children
}: StateInterface) {
    const initialState = {
        auth: null
    }

    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    
    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if(firebaseUser){
                console.log('firebaseUser')
                const userRef = doc(db, 'users', firebaseUser.uid)
                const userSnap = await getDoc(userRef)
                const userData = userSnap.data()!

                dispatch({
                    type: "GET_USER",
                    auth: {
                        id: firebaseUser?.uid,
                        username: firebaseUser?.displayName,
                        email: firebaseUser?.email,
                        role: userData?.role,
                    }
                })
            }else{
                dispatch({
                    type: "GET_USER",
                    auth: null
                })
            }

            setLoading(false)
        });
        return unsubscribe;
    }, []);


    const login = async (values: any)=> {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password)
            toast.success('Giriş başarılı')
            return true
        } catch (err: any) {
            const code: string = err.code || err.message;
            console.log(code)
            const message = getFirebaseErrorMessage(code);
            toast.error(message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            await signOut(auth)
            dispatch({ type: "GET_USER", auth: null })
            toast.success('Çıkış yapıldı')
        } catch (err: any) {
            const message = getFirebaseErrorMessage(err.code || err.message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            loading: loading,
            auth: state.auth,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
