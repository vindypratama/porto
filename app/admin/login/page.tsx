/**
 * app/admin/login/page.tsx — Halaman login Admin.
 *
 * Form kredensial (email + password) yang dikirim ke Auth.js.
 * Hanya dapat diakses oleh user dengan kredensial yang valid di database.
 */

import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
