import { UserType } from './user';

export type MumbleType = {
  id: string;
  creator: UserType;
  text: string;
  mediaUrl?: string;
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif';
  likeCount: number;
  likedByUser: boolean | string;
  replyCount: number;
  createdAt: string;
};
