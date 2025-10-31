# TODO: Integrate DigiLockerWidget into Dashboards

- [x] Modify Digilocker/DigiLocker.tsx:
  - Add TypeScript interface for props: `interface DigiLockerWidgetProps { userType: 'student' | 'teacher'; }`
  - Update component to accept props, adjust title based on userType ("My DigiLocker" for student, "Teacher DigiLocker" for teacher), and style as a widget (remove min-h-screen, add card classes like p-4, shadow-md, rounded-xl, make content compact).
  - Rename export to DigiLockerWidget for clarity.

- [x] Update src/app/student/dashboard/page.tsx:
  - Import DigiLockerWidget from the Digilocker directory.
  - Add DigiLockerWidget to the right sidebar grid section with userType="student".

- [x] Update src/app/teacher/dashboard/page.tsx:
  - Import DigiLockerWidget from the Digilocker directory.
  - Add DigiLockerWidget to the col-span-1 grid section with userType="teacher".

- [x] Followup steps:
  - Verify the widget renders correctly in both dashboards.
  - Test responsiveness and styling consistency.
  - Run the app to ensure no errors.
