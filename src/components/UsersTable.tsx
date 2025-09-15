'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { User } from '@/types';
import Pagination from '@/components/Pagination';
import { Trash2, FileText } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUsersStore } from '@/store/usersStore';
import { useRouter } from 'next/navigation';
import ConfirmModal from './ConfirmModal';
import { toast } from 'sonner';

interface UsersTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Tabla de usuarios
export default function UsersTable({ users, currentPage, totalPages, onPageChange }: UsersTableProps) {
  const { role } = useAuthStore();
  const { 
    deletedUsers, 
    roleChanges, 
    markUserAsDeleted, 
    isUserDeleted, 
    changeUserRole, 
    getUserRole 
  } = useUsersStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  
  const isAdmin = role === 'admin';
  
  // Simular roles para usuarios y aplicar cambios
  const usersWithRoles = useMemo(() => {
    const roles: ('admin' | 'user' | 'moderator')[] = ['admin', 'user', 'moderator'];
    return users.map(user => ({
      ...user,
      role: getUserRole(user.id) || roles[user.id % 3] // Usar rol cambiado o el original
    }));
  }, [users, roleChanges]);

  // Crear el helper de columnas
  const columnHelper = createColumnHelper<User>();

  const columns = [
    // Renderizar el checkbox de selección
    ...(isAdmin ? [columnHelper.display({
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
            } else {
              setSelectedUsers(new Set());
            }
          }}
          className="rounded border-gray-300"
        />
      ),
      // Renderizar el checkbox de selección
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedUsers.has(row.original.id)}
          onChange={(e) => {
            const userId = row.original.id;
            if (e.target.checked) {
              setSelectedUsers(prev => new Set([...prev, userId]));
            } else {
              setSelectedUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
              });
            }
          }}
          className="rounded border-gray-300"
        />
      ),
    })] : []),
    // Renderizar la foto de perfil
    columnHelper.accessor('avatar', {
      header: 'Foto',
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full"
        />
      ),
    }),
    // Renderizar el nombre
    columnHelper.accessor('first_name', {
      header: 'Nombre',
      cell: (info) => (
        <span>
          {info.getValue()} {info.row.original.last_name}
        </span>
      ),
    }),
    // Renderizar el correo
    columnHelper.accessor('email', {
      header: 'Correo',
    }),
    // Renderizar el rol
    columnHelper.accessor('role', {
      header: 'Rol',
      cell: (info) => {
        const userRole = info.getValue();
        const userId = info.row.original.id;
        const colors = {
          admin: 'bg-red-100 text-red-800',
          moderator: 'bg-yellow-100 text-yellow-800',
          user: 'bg-green-100 text-green-800'
        };
        
        if (isAdmin) {
          return (
            <select
              value={userRole || 'user'}
              onChange={(e) => {
                const newRole = e.target.value as 'admin' | 'user' | 'moderator';
                changeUserRole(userId, newRole);
              }}
              className={`px-2 py-1 rounded-full text-xs border-0 ${colors[userRole || 'user']} cursor-pointer`}
            >
              <option value="user">user</option>
              <option value="moderator">moderator</option>
              <option value="admin">admin</option>
            </select>
          );
        } else {
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${colors[userRole || 'user']}`}>
              {userRole || 'user'}
            </span>
          );
        }
      },
    }),
    // Renderizar las acciones
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/posts/user/${info.row.original.id}`)}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FileText className="w-3 h-3" />
            Ver Posts
          </button>
          {isAdmin && (
            <button
              onClick={() => handleDelete(info.row.original)}
              disabled={isUserDeleted(info.row.original.id)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 className="w-3 h-3" />
              {isUserDeleted(info.row.original.id) ? 'Eliminado' : 'Eliminar'}
            </button>
          )}
        </div>
      ),
    }),
  ];

  // Filtrar usuarios
  const filteredUsers = useMemo(() => {
    let filtered = usersWithRoles.filter(user => !isUserDeleted(user.id));
    
    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por rol
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    return filtered;
  }, [usersWithRoles, deletedUsers, searchTerm, roleFilter]);

  // Crear la tabla
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Manejar el clic en el botón de eliminar usuario
  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  // Confirmar eliminación del usuario
  const confirmDeleteUser = () => {
    if (userToDelete) {
      markUserAsDeleted(userToDelete.id);
      toast.success(`Usuario ${userToDelete.first_name} ${userToDelete.last_name} eliminado correctamente!`);
      setUserToDelete(null);
    }
  };

  // Manejar la eliminación masiva de usuarios
  const handleBulkDelete = () => {
    setShowBulkDeleteConfirm(true);
  };

  // Confirmar eliminación masiva de usuarios
  const confirmBulkDelete = () => {
    selectedUsers.forEach(userId => {
      markUserAsDeleted(userId);
    });
    setSelectedUsers(new Set());
    toast.success(`${selectedUsers.size} usuario(s) eliminado(s) correctamente!`);
  };

  // Manejar el cambio de rol masivo de usuarios
  const handleBulkRoleChange = (newRole: 'admin' | 'user' | 'moderator') => {
    const selectedIds = Array.from(selectedUsers);
    
    selectedIds.forEach(userId => {
      changeUserRole(userId, newRole);
    });
    
    setSelectedUsers(new Set());
  };

  // Renderizar la tabla
  return (
    <div className="space-y-4">
      {/* Indicador de rol del usuario actual */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rol actual:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {role === 'admin' ? 'Administrador' : 'Usuario'}
          </span>
        </div>
        {!isAdmin && (
          <span className="text-xs text-gray-500">
            Solo lectura - Sin permisos de edición
          </span>
        )}
      </div>

      {/* Renderizar los filtros */}
      <div className="flex items-center gap-4">
        <input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-sm h-10 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-10 rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderador</option>
          <option value="user">Usuario</option>
        </select>
        <div className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </div>
      </div>

      {/* Renderizar las acciones masivas - Solo para admins */}
      {isAdmin && selectedUsers.size > 0 && (
        <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-800">
            {selectedUsers.size} usuario(s) seleccionado(s)
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar seleccionados
          </button>
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleBulkRoleChange(e.target.value as 'admin' | 'user' | 'moderator');
                e.target.value = '';
              }
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
          >
            <option value="">Cambiar rol a...</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderador</option>
            <option value="user">Usuario</option>
          </select>
        </div>
      )}

      {/* Renderizar la tabla */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renderizar el componente de paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Modal de confirmación para eliminar usuario */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
        title="Eliminar Usuario"
        message={`¿Estás seguro de que quieres eliminar al usuario ${userToDelete?.first_name} ${userToDelete?.last_name}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      {/* Modal de confirmación para eliminación masiva */}
      <ConfirmModal
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={confirmBulkDelete}
        title="Eliminar Usuarios Seleccionados"
        message={`¿Estás seguro de que quieres eliminar ${selectedUsers.size} usuario(s) seleccionado(s)? Esta acción no se puede deshacer.`}
        confirmText="Eliminar Todos"
        cancelText="Cancelar"
      />
    </div>
  );
}