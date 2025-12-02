import type { Student } from "@/entities/student";
import {
  CalendarIcon,
  ClipboardIcon,
  ClockIcon,
  CoinsIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { DetailRow } from "./row";
import { GroupList } from "./group";

export function StudentCard({ student }: { student: Student }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-xl font-medium text-blue-800">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{student.name}</h3>
            <p className="mt-1 text-sm text-gray-500">ID: {student._id}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            student.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {student.status}
        </span>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <DetailRow icon={<MailIcon />} label="Email" value={student.email} />
          <DetailRow icon={<PhoneIcon />} label="Phone" value={student.phone} />
          <DetailRow icon={<UserIcon />} label="Guardian" value={`${student.guardian} (${student.guardianPhone})`} />
          <DetailRow
            icon={<CalendarIcon />}
            label="Birth Date"
            value={
              new Date(student.birthDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) || "Not provided"
            }
          />
          <DetailRow icon={<MapPinIcon />} label="Address" value={student.adress || "Not provided"} />
          <DetailRow icon={<CoinsIcon />} label="Coins" value={student.coins?.toString() ?? "0"} />
          <DetailRow
            icon={<ClockIcon />}
            label="Last Login"
            value={student.lastLogin ? new Date(student.lastLogin).toLocaleString() : "Never logged in"}
          />
          <GroupList groups={student.groups} />
          <DetailRow icon={<ClipboardIcon />} label="Notes" value={student.notes || "No additional notes"} />
        </dl>
      </div>
    </div>
  );
}
