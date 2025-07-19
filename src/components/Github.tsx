import { Link } from "react-router-dom"

export default function Github() {
    return (
        <div className="bg-amber-200 p-4 text-center">
            <p className="mb-0">
                <span>Github'ta incelemek için lütfen </span> 
                <Link to='https://github.com/can-web3/react-firebase-blogapp' className="text-blue-600 underline" target="_blank">
                    tıklayınız
                </Link>
            </p>
            <p className="mb-0"><span className="font-bold">Not:</span> Proje gelişim aşamasındadır.</p>
        </div>
    )
}
