export const chatRoomSchema = {
  host: {
    type: String,
    label: 'Host',
    defaultValue: '',
    optional: false,
  },
  target: {
    type: String,
    label: 'Target',
    defaultValue: '',
    optional: false,
  },
};

export interface IChatRoom {
  room_id: string;
  host: string;
  target: string;
  createdat: Date;
  updatedat: Date;
  createdby: string;
}
