// backend/server.ts
import PocketBase from 'pocketbase';

const database = process.env.NEXT_PUBLIC_DATABASE_API || 'http://127.0.0.1:8090';

// Initialize PocketBase connection
export const db = new PocketBase(database);

// Optional: Auto-cancellation to prevent memory leaks
db.autoCancellation(false);

// Helper functions for posts collection
export const postsCollection = db.collection('posts');

// Define the Blog Post type
export interface BlogPostData {
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  date: string;
  content: string; // JSON string of sections
  [key: string]: unknown; // Allow for additional fields from PocketBase
}

// Type for PocketBase record
export interface PostRecord extends BlogPostData {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: unknown;
}

export const getPosts = async (): Promise<PostRecord[]> => {
  try {
    const records = await postsCollection.getFullList({
      sort: '-created',
    });
    return records as PostRecord[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPostById = async (id: string): Promise<PostRecord | null> => {
  try {
    const record = await postsCollection.getOne(id);
    return record as PostRecord;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const createPost = async (data: Omit<BlogPostData, 'id' | 'created' | 'updated' | 'collectionId' | 'collectionName'>): Promise<PostRecord> => {
  try {
    const record = await postsCollection.create(data);
    return record as PostRecord;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id: string, data: Partial<Omit<BlogPostData, 'id' | 'created' | 'updated' | 'collectionId' | 'collectionName'>>): Promise<PostRecord> => {
  try {
    const record = await postsCollection.update(id, data);
    return record as PostRecord;
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

// Optional: Type for booking data if you have bookings collection
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