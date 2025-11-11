export default function BtnPrimary({
    isSubmitting
}) {
  return (
    <div className="text-end">
        <button
            type="submit"
            className="btn-primary mt-4"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Bekleyiniz...' : 'Gönder'}
        </button>
    </div>
  )
}
