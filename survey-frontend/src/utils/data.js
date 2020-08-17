export const TRIP_SOURCE = [
  {
    value: 'backend-mobile',
    label: 'Backend Mobile',
    className: 'warning text-white',
    name: 'backend-mobile',
  },
  {
    value: 'backend-web',
    label: 'Backend Web',
    className: 'info text-white',
    name: 'backend-web',
  },
  {
    value: 'frontend-account-web',
    label: 'Frontend Account Web',
    className: 'secondary text-white',
    name: 'frontend-account-web',
  },
  {
    value: 'frontend-mobile',
    label: 'Frontend Mobile',
    className: 'primary text-white',
    name: 'frontend-mobile',
  },
  {
    value: 'frontend-web',
    label: 'Frontend Web',
    className: 'default text-white',
    name: 'frontend-web',
  },
];

export const TRIP_STATUS = [
  { value: 'pending', label: 'Pending', className: 'warning', name: 'pending' },
  { value: 'ongoing', label: 'Ongoing', className: 'primary', name: 'ongoing' },
  {
    value: 'completed',
    label: 'Completed',
    className: 'success',
    name: 'completed',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    className: 'danger',
    name: 'cancelled',
  },
];

export const BOOKING_STATUS = [
  { value: 'pending', label: 'Pending', className: 'warning', name: 'pending' },
  {
    value: 'completed',
    label: 'Completed',
    className: 'success',
    name: 'completed',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    className: 'danger',
    name: 'cancelled',
  },
];

const isSelectInput = item => !!(item && item.value && item.label);

export const parseFormPayload = (
  values,
  selectables = [],
  nestedProps = []
) => {
  const payload = { ...values };
  Object.keys(payload).forEach(key => {
    const item = payload[key];
    if (isSelectInput(item) && selectables.includes(key)) {
      payload[key] = item.value;
    }
    if (
      typeof item === 'object' &&
      !isSelectInput(item) &&
      nestedProps.includes(key)
    ) {
      payload[key] = parseFormPayload(item, selectables, nestedProps);
    }
  });

  return payload;
};

export const populateFormSelectInput = (
  values = {},
  selectables = [],
  nestedProps = []
) => {
  const payload = { ...values };
  Object.keys(payload).forEach(key => {
    const item = payload[key];
    if (selectables.includes(key) && typeof item === 'string') {
      payload[key] = { label: item, value: item };
    }
    if (typeof item === 'object' && nestedProps.includes(key)) {
      payload[key] = populateFormSelectInput(item, selectables, nestedProps);
    }
  });

  return payload;
};

export const options = {
  countries: [
    {
      label: 'Nigeria',
      value: 'Nigeria',
    },
  ],
  educationQualifications: [
    {
      label: 'WASCE',
      value: 'WASCE',
    },
    {
      label: 'GCE',
      value: 'GCE',
    },
    {
      label: 'OND',
      value: 'OND',
    },
    {
      label: 'HND',
      value: 'HND',
    },
    {
      label: 'BA',
      value: 'BA',
    },
    {
      label: 'B.Sc',
      value: 'B.Sc',
    },
    {
      label: 'M.Sc',
      value: 'M.Sc',
    },
    {
      label: 'B.Arch',
      value: 'B.Arch',
    },
    {
      label: 'B.B.A',
      value: 'B.B.A',
    },
    {
      label: 'B.Ed',
      value: 'B.Ed',
    },
    {
      label: 'B.Eng',
      value: 'B.Eng',
    },
    {
      label: 'B.N',
      value: 'B.N',
    },
    {
      label: 'LLB (Hons)/B.L',
      value: 'LLB (Hons)/B.L',
    },
    {
      label: 'PGD',
      value: 'PGD',
    },
    {
      label: 'PGDE',
      value: 'PGDE',
    },
    {
      label: 'M.A',
      value: 'M.A',
    },
    {
      label: 'M.Arch',
      value: 'M.Arch',
    },
    {
      label: 'M.Biochem',
      value: 'M.Biochem',
    },
    {
      label: 'M.BioSci',
      value: 'M.BioSci',
    },
    {
      label: 'M.Ed',
      value: 'M.Ed',
    },
    {
      label: 'M.Eng',
      value: 'M.Eng',
    },
    {
      label: 'M.Lang',
      value: 'M.Lang',
    },
    {
      label: 'M.Phys',
      value: 'M.Phys',
    },
    {
      label: 'M.Sc',
      value: 'M.Sc',
    },
  ],
  expense_type: [
    { label: 'Driver', value: 'Driver' },
    { label: 'Fleet', value: 'Fleet' },
    { label: 'Customer', value: 'Customer' },
    { label: 'Transaction', value: 'Transaction' },
    { label: 'Booking', value: 'Booking' },
    { label: 'Trip', value: 'Trip' },
  ],
  gender: [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
  ],
  maritalStatus: [
    {
      label: 'Single',
      value: 'Single',
    },
    {
      label: 'Married',
      value: 'Married',
    },
    {
      label: 'Divorced',
      value: 'Divorced',
    },
  ],
  bloodGroup: [
    {
      label: 'A+',
      value: 'A+',
    },
    {
      label: 'A-',
      value: 'A-',
    },
    {
      label: 'B+',
      value: 'B+',
    },
    {
      label: 'B-',
      value: 'B-',
    },
    {
      label: 'AB+',
      value: 'AB+',
    },
    {
      label: 'AB-',
      value: 'AB-',
    },
    {
      label: 'O+',
      value: 'O+',
    },
    {
      label: 'O-',
      value: 'O-',
    },
  ],
  genotype: [
    {
      label: 'AA',
      value: 'AA',
    },
    {
      label: 'AS',
      value: 'AS',
    },
    {
      label: 'AC',
      value: 'AC',
    },
    {
      label: 'SS',
      value: 'SS',
    },
  ],
  employmentTypes: [
    { value: 'full-time', label: 'Full Time' },
    {
      value: 'part-time',
      label: 'Part Time',
    },
    { value: 'contract', label: 'Contract' },
    { value: 'probation', label: 'Probation' },
  ],
  driverStatus: [
    { value: 'available', label: 'Available' },
    { value: 'transit', label: 'In Transit' },
    {
      value: 'rest',
      label: 'Resting Hours',
    },
  ],
  profileTypeValues: [
    { label: 'Organization Admin', value: 'Admin' },
    { label: 'App', value: 'App' },
    { label: 'Client', value: 'Client' },
  ],
  terminalState: [
    { label: 'Active', value: 'true' },
    { label: 'InActive', value: 'false' },
  ],
  fleetTypes: [
    { value: 'road', label: 'Road' },
    {
      value: 'air',
      label: 'Air',
    },
    { value: 'rail', label: 'Rail' },
    { value: 'water', label: 'Water' },
  ],
  expense_status: [
    { label: 'initiated', value: 'initiated' },
    { value: 'executed', label: 'executed' },
    { label: 'approved', value: 'approved' },
    { label: 'rejected', value: 'rejected' },
  ],
};
