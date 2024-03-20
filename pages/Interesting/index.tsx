import { useEffect, useState } from 'react';
import Head from 'next/head';

interface Post {
  id: string;
  title: string;
  img?: string;
  youtube?: string;
  h_line: string;
  ppp: string;
}

// ตัวอย่าง metadata สามารถนำมาใช้หรือปรับเปลี่ยนตามที่ต้องการ
const pageMetadata = {
  title: "หน้านี้เป็นความรู้ดีดีแจกฟรี รับทำโฆษณาออนไลน์ Google,Facebookสายเทา",
  description: "หน้านี้เป็นความรู้ดีดีแจกฟรี",
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.service-ads.com/api');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Head>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
      </Head>
      <main className='container text-center'>
        <div className="card mb-3">
          {posts.map((post) => (
            <li key={post.id}>
              <h1>{post.title}</h1>
              {post.img && (
                <div className="imgpost">
                  <img src={post.img} alt={post.title} style={{ width: '100%' }} />
                </div>
              )}
              {post.youtube && (
                <div className="videopost">
                  <iframe
                    src={`https://www.youtube.com/embed/${post.youtube}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={post.title}
                  ></iframe>
                </div>
              )}
              <h3 className='card-title'>{post.h_line}</h3>
              <p className='card-text'>{post.ppp}</p>
            </li>
          ))}
        </div>
        <hr className='hr'/>
      </main>
    </>
  );
}
