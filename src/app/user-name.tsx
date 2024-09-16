"use client"

import {  useUser } from '@clerk/nextjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function YourFilesButton() {
  const { user } = useUser();

  if (!user) {
    // Handle the case where the user is not signed in
    return null;
  }
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div>
        {fullName}
      </div>
  );
}