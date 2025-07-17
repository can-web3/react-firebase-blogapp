export default function BtnPrimary({
    isSubmitting
}) {
  return (
    <div>
        <button
            className="btn-primary mt-4"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Bekleyiniz...' : 'Gönder'}
        </button>
    </div>
  )
}
