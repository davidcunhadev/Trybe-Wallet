export type UserLogin = {
  email: string
};

export type WalletInfos = {
  currencies: [],
  expenses: [],
  editor: boolean,
  idToEdit: number
};

export type RootState = {
  user: UserLogin,
  wallet: WalletInfos
};
