// backend/server.ts
import PocketBase from 'pocketbase';

const database = process.env.NEXT_PUBLIC_DATABASE_API || 'http://127.0.0.1:8090';

export const db = new PocketBase(database);
db.autoCancellation(false);

export const postsCollection = db.collection('posts');

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPostData {
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string; // raw filename from PocketBase e.g. "photo_abc123.jpeg"
  date: string;
  content: string;
  [key: string]: unknown;
}

export interface PostRecord extends BlogPostData {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: unknown;
}

// ─── Image URL helper ─────────────────────────────────────────────────────────

// PocketBase stores only the filename in the `image` field.
// The full URL format is: {baseUrl}/api/files/{collectionId}/{recordId}/{filename}
function buildImageUrl(record: PostRecord): string {
  if (!record.image) return '';
  // If it's already a full URL (shouldn't happen, but guard anyway)
  if (record.image.startsWith('http')) return record.image;
  return `${database}/api/files/${record.collectionId}/${record.id}/${record.image}`;
}

// Transforms a raw PocketBase record so `image` is always a full usable URL
function normalizeRecord(record: PostRecord): PostRecord {
  return {
    ...record,
    image: buildImageUrl(record),
  };
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

export const getPosts = async (): Promise<PostRecord[]> => {
  try {
    const records = await postsCollection.getFullList({ sort: '-created' });
    return (records as PostRecord[]).map(normalizeRecord);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPostById = async (id: string): Promise<PostRecord | null> => {
  try {
    const record = await postsCollection.getOne(id);
    return normalizeRecord(record as PostRecord);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Accepts FormData so file uploads work correctly.
// The PocketBase SDK passes FormData straight through to the API as multipart.
// Do NOT change this back to a plain object type — file fields require FormData.
export const createPost = async (data: FormData): Promise<PostRecord> => {
  try {
    const record = await postsCollection.create(data);
    return normalizeRecord(record as PostRecord);
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Same — must be FormData so that a newly chosen image file is sent correctly.
// If no new image is chosen, simply don't append "image" to the FormData and
// PocketBase will leave the existing image untouched.
export const updatePost = async (id: string, data: FormData): Promise<PostRecord> => {
  try {
    const record = await postsCollection.update(id, data);
    return normalizeRecord(record as PostRecord);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<boolean> => {
  try {
    await postsCollection.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// ─── Bookings (unchanged) ─────────────────────────────────────────────────────

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  sessionType: string;
  deliveryMode: string;
  preferredDate: string;
  preferredTimeSlot: string;
  alternateDate?: string;
  organisation?: string;
  role?: string;
  context?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  [key: string]: unknown;
}

export interface BookingRecord extends BookingData {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: unknown;
}