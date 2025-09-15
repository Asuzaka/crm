import type React from "react";
import { CreateStudentForm } from "../../../features/new-student";
import { Modal } from "../../../shared/ui";

export function NewStudent({
  children,
}: {
  children: React.ReactElement<{ onClick?: () => void }>;
}) {
  return (
    <Modal>
      <Modal.Open opens="createStudent">{children}</Modal.Open>
      <Modal.Window name="createStudent">
        <CreateStudentForm />
      </Modal.Window>
    </Modal>
  );
}
