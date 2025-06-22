// app/admin/layout.js
import { AdminAuthProvider } from '../contexts/AdminAuthContext';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminLayout({ children }) {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <AdminAuthProvider>
        <AdminNavbar />
        {children}
      </AdminAuthProvider>
    </div>
  );
}