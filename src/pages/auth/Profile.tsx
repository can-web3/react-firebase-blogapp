import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext";
import Seo from "../../components/Seo";

export default function Profile() {
    const { auth } = useContext(AuthContext);

    return (
        <div className="container my-5">
            <Seo
                title="Profilim"
                description="Kullanıcı profil sayfası"
                robots="noindex,nofollow"
            />

            <h1>Hoşgeldin, {auth?.username}</h1>

            
        </div>
    )
}
