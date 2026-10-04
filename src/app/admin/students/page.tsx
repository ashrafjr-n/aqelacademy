import { CalendarDays, Globe, Search, Ticket, Users } from "lucide-react";
import { ContactButtons } from "@/components/admin/contact-buttons";
import { fieldIconClassName, inputClassName } from "@/components/forms/field";
import { Avatar } from "@/components/ui/avatar";
import { buttonClassName } from "@/components/ui/button-styles";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTitle } from "@/components/ui/page-title";
import { adminCopy, adminSections, adminStudentWhatsAppMessage } from "@/content/admin";
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
      <PageTitle title={adminSections.students.label} description={adminCopy.studentsDescription} />

      <form role="search" className="flex gap-2">
        <label htmlFor="students-search" className="sr-only">
          {adminCopy.studentsSearch}
        </label>
        <div className="relative flex-1">
          <span className={fieldIconClassName}>
            <Search aria-hidden="true" className="size-5" />
          </span>
          <input
            id="students-search"
            name="q"
            type="search"
            defaultValue={search}
            placeholder={adminCopy.studentsSearch}
            className={`${inputClassName} pl-4 pr-11 text-lg`}
          />
        </div>
        <button type="submit" className={`${buttonClassName("primary")} shrink-0 text-base`}>
          بحث
        </button>
      </form>

      <Card flush>
        {items.length === 0 ? (
          <EmptyState icon={<Users aria-hidden="true" />} title={adminCopy.noStudents} />
        ) : (
          <ul className="divide-y divide-line">
            {items.map((student) => (
              <li key={student.id} className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <Avatar name={student.full_name} size="lg" />
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold text-ink">{student.full_name}</p>
                    <p dir="ltr" className="truncate text-end text-sm">
                      {student.email}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <li className="flex items-center gap-1.5">
                        <CalendarDays aria-hidden="true" className="size-4 text-body/60" />
                        {adminCopy.joinedOn} {formatDate(student.created_at)}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Ticket aria-hidden="true" className="size-4 text-body/60" />
                        {adminCopy.bookingsCount(student.bookingsCount)}
                      </li>
                      {student.countryName && (
                        <li className="flex items-center gap-1.5">
                          <Globe aria-hidden="true" className="size-4 text-body/60" />
                          {student.countryName}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
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
      </Card>
    </>
  );
}
