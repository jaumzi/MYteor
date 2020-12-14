export const chatMessageSchema = {
  roomId: {
    type: String,
    label: 'Room ID',
    defaultValue: '',
    optional: false,
  },
  from: {
    type: String,
    label: 'Text',
    defaultValue: '',
    optional: false,
  },
  to: {
    type: String,
    label: 'Text',
    defaultValue: '',
    optional: false,
  },
  text: {
    type: String,
    label: 'Text',
    defaultValue: '',
    optional: false,
  },
  date: {
    type: Date,
    label: 'Date',
    defaultValue: '',
    optional: false,
  },
};

export interface IChatMessage {
  roomId: string;
  from: string;
  to: string;
  text: string;
  date: Date;
  createdat: Date;
  updatedat: Date;
  createdby: string;
}
