import { CalendarDays, Globe, Search, Ticket } from "lucide-react";
import { ContactButtons } from "@/components/admin/contact-buttons";
import { inputClassName } from "@/components/forms/field";
import { buttonClassName } from "@/components/ui/button-styles";
import { adminCopy, adminStudentWhatsAppMessage } from "@/content/admin";
import { countries } from "@/content/countries";
import { getStudents } from "@/lib/dal/admin";
import { formatDate } from "@/lib/format";

export default async function AdminStudentsPage({ searchParams }: PageProps<"/admin/students">) {
  const { q } = await searchParams;
  const search = typeof q === "string" ? q : "";
  const students = await getStudents(search);
  const items = students.map((student) => ({
    ...student,
    countryName: countries.find((country) => country.code === student.country)?.name,
    firstName: student.full_name.split(" ")[0],
  }));

  return (
    <>
      <form role="search" className="flex gap-2">
        <label htmlFor="students-search" className="sr-only">
          {adminCopy.studentsSearch}
        </label>
        <input
          id="students-search"
          name="q"
          type="search"
          defaultValue={search}
          placeholder={adminCopy.studentsSearch}
          className={`${inputClassName} px-4 text-lg`}
        />
        <button type="submit" className={`${buttonClassName("primary")} shrink-0 text-base`}>
          <Search aria-hidden="true" className="size-5" />
          بحث
        </button>
      </form>

      {items.length === 0 ? (
        <p className="rounded-3xl border border-line bg-white p-10 text-center font-bold text-ink">{adminCopy.noStudents}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((student) => (
            <li key={student.id} className="space-y-4 rounded-3xl border border-line bg-white p-6">
              <div>
                <h2 className="text-xl font-bold text-ink">{student.full_name}</h2>
                <p dir="ltr" className="mt-1 text-start text-base">
                  {student.email}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
                <li className="flex items-center gap-2">
                  <CalendarDays aria-hidden="true" className="size-5 text-brand" />
                  انضم في {formatDate(student.created_at)}
                </li>
                <li className="flex items-center gap-2">
                  <Ticket aria-hidden="true" className="size-5 text-brand" />
                  {student.bookingsCount} طلب حجز
                </li>
                {student.countryName && (
                  <li className="flex items-center gap-2">
                    <Globe aria-hidden="true" className="size-5 text-brand" />
                    {student.countryName}
                  </li>
                )}
              </ul>
              <ContactButtons
                email={student.email}
                phone={student.phone}
                whatsappMessage={adminStudentWhatsAppMessage(student.firstName)}
                noPhoneText={adminCopy.noPhone}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
