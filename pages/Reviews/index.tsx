
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';



export default function HomePage() {

  const metadata = {
    title: "รีวิวจากลูกค้าจริง รับทำโฆษณาออนไลน์ Google,Facebookสายเทา",
    description: "รีวิวจากลูกค้าจริง ลูกค้าประจำแนะนำเพื่อนบอกต่อปากต่อปาก การันตีผลงานให้ด้วย",
    
  };

  return (
    <>
      <Head>
        <title>รีวิวจากลูกค้าจริง รับทำโฆษณาออนไลน์ Google,Facebookสายเทา</title>
        <meta name="description" content="รีวิวจากลูกค้าจริง ลูกค้าประจำแนะนำเพื่อนบอกต่อปากต่อปาก การันตีผลงานให้ด้วย" />
        <meta name="keywords" content="ยิงads,facebook,สายเทา" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="adsmanager" />
        <meta property="og:title" content="รับทำโฆษณาออนไลน์สายเทา" />
        <meta property="og:description" content="รับทำโฆษณาออนไลน์สายเทา Google, YouTube, Facebook" />
        <link rel="canonical" href='https://www.service-ads.com/' />
      </Head>
    
      


    <div className="container">
      





    <div className="text-center">
    <h5>รีวิวจากลูกค้าจริง ลูกค้าประจำแนะนำเพื่อนบอกต่อปากต่อปาก การันตีผลงานให้ด้วย</h5>
</div>


<div className="card-group">
  <div className="card">
 
  <div className="image-container">
          <img src="/review/review1.jpg" alt="Review" width='100%' />
        </div><Link href="/">รีวิวการใช้งานจากลูกค้าจริง </Link>
  <div className="image-container">
          <img src="/review/review2.jpg" alt="Review" width='100%' />
        </div><Link href="/">รีวิวการใช้งานจากลูกค้าจริง </Link>
  <div className="image-container">
          <img src="/review/review3.jpg" alt="Review" width='100%' />
        </div><Link href="/">รีวิวการใช้งานจากลูกค้าจริง </Link>
  <div className="image-container">
          <img src="/review/review4.jpg" alt="Review" width='100%' />
        </div><Link href="/">รีวิวการใช้งานจากลูกค้าจริง </Link>

        </div></div>
 {/* ----------------------------------------------------- */}
 <div className="text-center">
<h5>รีวิวจากลูกค้าจริง ขอปรับงบเพิ่ม จาก5,000บาท/วัน เป็น 10,000 บาท/วัน</h5>
</div>





    </div>
   
    </>
  )
}
