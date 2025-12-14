import PublicFormClient from "./PublicFormClient";

export default function PublicFormPage({ params }: { params: { token: string } }) {
  const token = params.token;

  // Render client form component and let it fetch session/questions client-side.
  // This avoids server-side JSON parsing issues and makes debugging easier.
  return <PublicFormClient token={token} />;
}
