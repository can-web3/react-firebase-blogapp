import React, { useContext, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'

export default function AuthMiddleware() {
    const { auth } = useContext(AuthContext)

    return (
        <div>AuthMiddleware</div>
    )
}
