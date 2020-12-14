export const exampleSch = {
  title: {
    type: String,
    label: 'Título',
    defaultValue: '',
    optional: false,
  },
  description: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: true,
  },
  users: {
    type: [Object],
    label: 'Usuários',
    defaultValue: '',
    optional: false,
  },
};

export interface IChat {
  _id?: string;

  title: string;
  description: string;
  users: [];

  createdat: Date;
  updatedat: Date;
  createdby: string;
  createdbyId: string;
}
