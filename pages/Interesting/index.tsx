import Head from 'next/head'
import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'


type Props = {
  posts: [Post]
}

type Post = {
  id: string;
  title: string;
  img?: string;
  youtube?: string;
  headline: string;
  content: string;
}

export async function getServerSideProps() {
  try {
    let response = await fetch("http://localhost:3000/api/get");
    if (!response.ok) {
      throw new Error(`Failed to fetch posts, status: ${response.status}`);
    }
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) }, // ใช้ JSON.parse(JSON.stringify(posts)) เพื่อแปลงค่าใดๆ ที่อาจเป็น incompatible กับ JSON
    };

  } catch (e) {
    console.error(e);
    return {
      props: { posts: [] }, // ตั้งค่าให้ posts เป็น array ว่างในกรณีของข้อผิดพลาด
    };
  }
}

export default function Home(props: Props) {

  const [posts, setPosts] = useState<[Post]>(props.posts);

  const handleDeletePost = async (postId: string) => {
  }

  return (
    <div className="container">
     <Head>
           <title>รับทำโฆษณาGoogleAdsสายเทา โฆษณาสายเทาเพื่อธุรกิจของคุณ</title>
           <meta name="description" content="ทำโฆษณาเว็บไซต์ต่างๆด้วยทีมงานมือถือชีพ อัตราค่าบริการเพียงเดือนละ 9,900 บาทจบไม่มีค่าใช้จ่ายใดๆเพิ่มเติมทั้งสิ้น มีรีวิวจากลูกค้าจริงให้ชมไม่บิดไม่ทิ้งงานแน่นอน ทางทีมงานมีการรายงานผลงานทุกวัน"/>
          
           <meta name="keywords" content="ยิงads,facebook,สายเทา,โฆษณา,ยิงads facebook สายเทา,รับยิงads,รับยิงแอด สายเทา,facebook ads,google ads,google,รับยิงแอด,ads,รับทำโฆษณา,รับโฆษณา,Facebook,การตลาด,โฆษณาออนไลน์,เว็บไซต์,ตลาดเป้าหมาย,โฆษณาบนโซเชียลมีเดีย,Google Ads,การโฆษณาบน Facebook,การโฆษณาออนไลน์บนสื่อต่าง ๆ,การตลาดออนไลน์,การโปรโมท,โฆษณา Facebook,การโฆษณา Google,การโฆษณาสินค้า,การโฆษณาโปรโมชั่น,วิธีการโฆษณา,ความสำเร็จในการตลาด,บริการโฆษณา,การตลาดออนไลน์บน Facebook,การโฆษณาบนเว็บ,การวางแผนโฆษณา,รับจ้างโฆษณา"/>
           <meta name="robots" content="index, follow"/>
           <meta name="author" content="adsmanager"/>
           <meta property="og:title" content="รับทำโฆษณาGoogleAdsสายเทา"/>
           <meta property="og:description" content="รับทำโฆษณาGoogleAdsสายเทา โฆษณาสายเทาเพื่อธุรกิจของคุณ"/>
    <meta property="og:image" content="https://www.service-ads.com/img/ads.jpg"/>
    <link rel="canonical" href='https://www.service-ads.com/Google' /> 
    </Head>

      <>
        <div className='container text-center'>
     
          {posts?.length > 0 ? (
            <div className='posts-list'>
              {posts.map((post, index) => {
                return (
                  <div key={index} className="post-item">
                    <div className='card mb-3'>
                    <h1>{post.title}</h1>
                    {post.img && (
                <div className="imgpost">
                  <img src={post.img} alt={post.title} style={{ width: '100%' }} />
                </div>
              )}
               {post.youtube && (
                <div className="videopost">
                  <iframe 
                  className='post'
                    src={`https://www.youtube.com/embed/${post.youtube}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={post.title}
                  ></iframe>
                </div>
              )}
               <h3 className="card-title">{post.headline}</h3>
              <p className="card-text">{post.content}</p>
                    </div>
                    <div className='post-item-actions'>
                     
                   
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <h2 className='posts-body-heading'></h2>
          )}
        </div>
      </>

     

      
    </div>
  )
}