import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center my-4">
            <h1 className="text-2xl text-gray-800 mt-4">Sayfa Bulunamadı</h1>
            <p className="text-gray-600 mt-2">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <Link
                to="/"
                className="btn-primary mt-4"
            >
                Ana Sayfaya Dön
            </Link>
        </div>
    );
}
