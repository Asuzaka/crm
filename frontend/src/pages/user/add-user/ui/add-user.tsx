import { CreatePageCover } from "@/shared/ui";
import { AddUserForm } from "../../../../features/user";

export function Add() {
  return (
    <CreatePageCover label="Add New User">
      <AddUserForm />
    </CreatePageCover>
  );
}
