export type SavedLinkResponse = {
   linkId?: string; // UUID is represented as string in TypeScript
   linkUrl?: string;
   title?: string;
   description?: string;
   userId?: string;
}