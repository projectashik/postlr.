import { atom } from 'jotai';

export const currentEditorTabAtom = atom('editor');
export const markdownContentAtom = atom('');
export const displayPublishBarAtom = atom(false);
export const articleTitleAtom = atom('');
export const articleCoverImageUrlAtom = atom('');

// Publish Bar
export const onHashnodeAtom = atom(false);
export const onDevToAtom = atom(false);
export const isScheduledAtom = atom(false);
export const scheduledAtAtom = atom('');

// Hashnode
export const hashnodeSelectedTagsAtom = atom([]);
export const hashnodeTagSearchInputAtom = atom('');
export const hashnodeTagsAtom = atom([]);
export const hashnodeSearchedTagsAtom = atom([]);
export const hideFromHashnodeFeedAtom = atom(false);
export const hashnodeCoverImageUrlAtom = atom('');

// Dev to
export const devToCoverImageUrlAtom = atom('');
export const devToTagsAtom = atom('');
export const devToSeriesAtom = atom('');
