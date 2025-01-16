export const departmentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEPARTMENT_NAME':
      return { ...state, departmentName: action.payload };
    case 'SET_PARENT_DEPARTMENT_ID':
      return { ...state, parentDepartmentId: action.payload };
    case 'SET_DEPARTMENT_LEAD':
      return { ...state, departmentLead: action.payload };
    case 'SET_ATTACHMENT_PATH':
      return { ...state, attachmentPath: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

