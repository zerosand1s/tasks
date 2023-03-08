export const getAuthErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Invalid password';
    default:
      return 'Authentication failed';
  }
};
