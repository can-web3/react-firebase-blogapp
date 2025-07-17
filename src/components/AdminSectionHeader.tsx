import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import type AdminSectionHeaderInterface from '../types/AdminSectionHeaderInterface'
import Helmet from "react-helmet"

export default function AdminSectionHeader({
    title,
    isOpenCreate = false
}: AdminSectionHeaderInterface) {
  return (
    <div className="flex items-center justify-between gap-2">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        
        <h1 className="text-lg font-semibold">{title}</h1>
        { isOpenCreate && (
            <Link to='ekle' className="btn-success">
                <FontAwesomeIcon icon={faPlus} />
                <span className="inline-block">Ekle</span>
            </Link>
        ) }
    </div>
  )
}
