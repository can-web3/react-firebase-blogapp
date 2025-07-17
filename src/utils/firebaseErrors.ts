export const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'Bu e‑posta zaten kayıtlı. Lütfen başka bir e‑posta deneyin.',
  'auth/invalid-email': 'Geçersiz e‑posta adresi.',
  'auth/weak-password': 'Parola çok zayıf. En az 6 karakter girin.',
  'auth/user-not-found': 'Böyle bir kullanıcı bulunamadı.',
  'auth/wrong-password': 'Parola hatalı.',
  'auth/invalid-credential': "E-posta veya parola hatalı"
};

export function getFirebaseErrorMessage(code: string): string {
  return firebaseErrorMessages[code] ?? 'Bir hata oluştu. Lütfen tekrar deneyin.';
}
