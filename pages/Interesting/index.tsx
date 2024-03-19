import Head from 'next/head';
import { useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Post = {
  _id: string;
  title: string;
  content: string;
  img?: string; // อาจไม่มีฟิลด์นี้
  youtube?: string; // อาจไม่มีฟิลด์นี้
  headline?: string; // อาจไม่มีฟิลด์นี้
};

type Props = {
  posts: Post[];
};

export async function getServerSideProps() {
  try {
    let response = await fetch('http://localhost:3000/api/get');
    let posts: Post[] = await response.json();

    return {
      props: { posts: posts },
    };
  } catch (e) {
    console.error(e);
    return { props: { posts: [] } };
  }
}

export default function Home({ posts }: Props) {
  const [postList, setPosts] = useState<Post[]>(posts);

  const handleDeletePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:3000/api/delete/${postId}`, {
        method: 'DELETE',
      });

      // ลบโพสต์จาก state หลังจากลบบนเซิร์ฟเวอร์สำเร็จ
      setPosts(postList.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('An error occurred while deleting', error);
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container w-50" id="container">
        <div className="card mb-3">
          {postList?.length > 0 ? (
            <ul className="posts-list">
              {postList.map((post, index) => (
                <li key={post._id || index} className="post-item">
                  <h1>{post.title}</h1>
                  {post.img && (
                    <Image src={post.img} alt={post.title} width={480} height={480} />
                  )}
                  {post.youtube && (
                    <iframe
                      src={`https://www.youtube.com/embed/${post.youtube}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={post.title}
                    ></iframe>
                  )}
                  <div className="card-body">
                    <h3 className="card-title">{post.headline}</h3>
                    <p className="card-text">{post.content}</p>
                    {/* ปุ่มลบโพสต์ */}
                    <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </>
  );
}
