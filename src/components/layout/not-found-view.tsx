import { AppFooter } from "@/components/layout/app-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button-link";

/** The 404 page for both root layouts; it renders outside the group layouts, so it brings its own header and footer. */
export function NotFoundView() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex flex-1 items-center bg-canvas">
        <section className="container-site py-24 text-center">
          <p className="font-heading text-7xl font-bold text-gold">404</p>
          <h1 className="mt-4 font-heading text-2xl font-bold text-ink">الصفحة غير موجودة</h1>
          <p className="mt-3">ربما تم نقل الصفحة أو أن الرابط غير صحيح.</p>
          <div className="mt-8">
            <ButtonLink href="/">العودة إلى الرئيسية</ButtonLink>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
