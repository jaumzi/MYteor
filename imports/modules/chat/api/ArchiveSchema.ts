export const ArchiveSch = {
  files: {
    type: [Object],
    label: 'Arquivos',
    defaultValue: '',
    optional: true,
    isUpload: true,
  },
};

export interface IArchive {
  _id?: string;

  files: string;

  createdat: Date;
  updatedat: Date;
  createdby: string;
  createdbyId: string;
}
