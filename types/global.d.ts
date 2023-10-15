// Notices types
interface NoticePayload {
  title: string;
  body: string;
}

// Question types
interface QuestionPayload {
  title: string;
  body: string;
  username: string;
  password: string;
  email?: string;
  phone?: string;
}

// Story types
interface StoryPayload {
  title: string;
  body: string;
  tags: string[];
  thumbnail: string;
}
