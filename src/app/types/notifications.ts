export interface Notification {
  id: string;
  type: 'payment' | 'maintenance' | 'class' | 'member' | 'system';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'payment',
    priority: 'high',
    title: 'Pago Vencido',
    message: 'La membresía de Carlos Lopez venció hace 3 días.',
    timestamp: 'Hace 2 horas',
    read: false,
  },
  {
    id: '2',
    type: 'maintenance',
    priority: 'medium',
    title: 'Mantenimiento Pendiente',
    message: 'Caminadora #3 requiere revisión técnica mensual.',
    timestamp: 'Hace 5 horas',
    read: false,
  },
  {
    id: '3',
    type: 'class',
    priority: 'low',
    title: 'Nueva Clase Programada',
    message: 'Clase de Yoga agregada para mañana a las 7:00 AM.',
    timestamp: 'Hace 1 día',
    read: false,
  },
  {
    id: '4',
    type: 'member',
    priority: 'medium',
    title: 'Nuevo Registro',
    message: '5 nuevos miembros registrados hoy.',
    timestamp: 'Hace 3 horas',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    priority: 'low',
    title: 'Actualización Disponible',
    message: 'Nueva versión del sistema disponible.',
    timestamp: 'Hace 2 días',
    read: true,
  },
];
