import { AdminAuthProvider, useAdminAuth } from '../hooks/useAdminAuth';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';

function AdminGate() {
  const { authed } = useAdminAuth();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}

export default function Admin() {
  return (
    <AdminAuthProvider>
      <AdminGate />
      <Toaster position="bottom-right" />
    </AdminAuthProvider>
  );
}
