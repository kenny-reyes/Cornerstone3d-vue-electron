export const applicationPaths = {
  FORBIDDEN: {
    name: 'forbidden',
    path: '/forbidden'
  },
  UNAUTHORIZED: {
    name: 'unauthorized',
    path: '/unauthorized'
  },
  PATIENT: {
    name: 'patients',
    path: '/patient'
  },
  PATIENT_DETAIL: {
    name: 'patientDetail',
    path: '/patient/:id'
  },
  HOME: {
    name: 'home',
    path: '/'
  },
  LOGIN: {
    name: 'login',
    path: '/login'
  },
  APR: {
    name: 'apr',
    path: '/apr'
  }
} as const
