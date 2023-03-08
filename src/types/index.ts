export type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: number;
};

export type SignUpValues = {
  name: string;
  email: string;
  password: string;
};

export type SignInValues = {
  email: string;
  password: string;
};

export type UpdateUserProfileParams = {
  displayName?: string;
  photoURL?: string;
};
