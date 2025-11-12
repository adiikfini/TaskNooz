// Script to seed Backendless Blogs table with dummy blog posts
// Usage: node scripts/seed-blogs-with-dummy-data.js

const fetch = global.fetch || require('node-fetch');

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID || '71966029-41AC-4ADD-93F6-07BE88132275';
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY || '22309958-AC30-44D3-9E86-CC2190106F5D';
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL || 'https://api.backendless.com';

const TABLE = 'Blogs';

const dummyPosts = [
  {
    title: "Top 5 RPA Trends to Watch in 2025",
    summary: "Robotic Process Automation is evolving. Discover the key trends, from hyperautomation to AI integration, that will shape the industry next year.",
    author: "Jane Doe",
    authorId: "author-jane-doe",
    publishDate: "Oct 28, 2025",
    category: "RPA",
    imageUrl: "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["RPA", "trends", "2025", "automation"],
    published: true,
  },
  {
    title: "How AI is Revolutionizing Document Processing (IDP)",
    summary: "Learn how Intelligent Document Processing (IDP) uses AI and ML to read, extract, and process data from any document, eliminating manual entry.",
    author: "John Smith",
    authorId: "author-john-smith",
    publishDate: "Oct 25, 2025",
    category: "AI/ML",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["AI", "machine learning", "document processing", "IDP"],
    published: true,
  },
  {
    title: "Case Study: How We Saved a Client $200k in Manufacturing",
    summary: "A deep dive into how our custom automation solution streamlined the supply chain for a major manufacturing client, resulting in significant ROI.",
    author: "Alice Johnson",
    authorId: "author-alice-johnson",
    publishDate: "Oct 22, 2025",
    category: "Case Studies",
    imageUrl: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["case study", "manufacturing", "ROI", "cost savings"],
    published: true,
  },
  {
    title: "The Future of Work: Automation and Human Collaboration",
    summary: "Automation isn't about replacing humans; it's about augmenting them. We explore how bots and employees can work together to drive productivity.",
    author: "David Lee",
    authorId: "author-david-lee",
    publishDate: "Oct 20, 2025",
    category: "Industry News",
    imageUrl: "https://images.pexels.com/photos/8728381/pexels-photo-8728381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["future of work", "collaboration", "automation", "human potential"],
    published: true,
  },
  {
    title: "Getting Started with RPA: A Beginner's Guide",
    summary: "New to automation? This guide breaks down the basics of RPA, what it can do for your business, and how to start your first project.",
    author: "Jane Doe",
    authorId: "author-jane-doe",
    publishDate: "Oct 18, 2025",
    category: "RPA",
    imageUrl: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["RPA", "beginner", "guide", "getting started"],
    published: true,
  },
  {
    title: "Case Study: Automating the Finance Department",
    summary: "See how our RPA bots automated invoice processing and financial reporting for a leading fintech company, ensuring 100% accuracy.",
    author: "Michael Brown",
    authorId: "author-michael-brown",
    publishDate: "Oct 15, 2025",
    category: "Case Studies",
    imageUrl: "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["case study", "finance", "automation", "accuracy"],
    published: true,
  },
];

async function seedBlogs() {
  try {
    const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
    console.log(`Seeding ${dummyPosts.length} blog posts to Backendless...`);

    for (const post of dummyPosts) {
      const payload = {
        ...post,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error(`Failed to create post "${post.title}":`, error);
        continue;
      }

      const data = await res.json();
      console.log(`✓ Created: "${post.title}" (ID: ${data.objectId})`);
    }

    console.log(`\n✅ Seeding complete! ${dummyPosts.length} blog posts have been added to Backendless.`);
  } catch (err) {
    console.error('Error seeding blogs:', err);
    process.exitCode = 1;
  }
}

seedBlogs();
