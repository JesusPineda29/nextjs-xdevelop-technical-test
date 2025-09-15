'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/useApi';
import UsersTable from '@/components/UsersTable';

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useUsers(currentPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-600">Error cargando usuarios. Por favor, intente nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-gray-600 mt-1">Gestionar cuentas de usuario</p>
      </div>

      {data && (
        <UsersTable
          users={data.data}
          currentPage={data.page}
          totalPages={data.total_pages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}