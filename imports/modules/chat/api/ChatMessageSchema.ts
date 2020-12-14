export const exampleSch = {
  chat_id: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: false,
  },
  user_id: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: false,
  },
  archive_id: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: false,
  },
  description: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: false,
  },
};

export interface IChatMessage {
  _id?: string;
  chat_id: string;
  user_id: string;
  archive_id?: string;

  description: string;

  createdat: Date;
  updatedat: Date;
  createdby: string;
  createdbyId: string;
}
