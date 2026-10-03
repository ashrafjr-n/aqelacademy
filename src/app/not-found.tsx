import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="container-site py-32 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">الصفحة غير موجودة</h1>
      <p className="mt-3">ربما تم نقل الصفحة أو أن الرابط غير صحيح.</p>
      <div className="mt-8">
        <ButtonLink href="/">العودة إلى الرئيسية</ButtonLink>
      </div>
    </section>
  );
}
