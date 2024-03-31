import React, { useState, useEffect, FC } from 'react';
import Image from 'next/image';
import Head from 'next/head';

interface CountdownModalProps {
  isOpen: boolean;
  onCountdownComplete: () => void;
  initialCount?: number;
}

const CountdownModal: FC<CountdownModalProps> = ({ isOpen, onCountdownComplete, initialCount = 30 }) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && count > 0) {
      timer = setTimeout(() => setCount(count - 1), 1000);
    } else if (count === 0) {
      onCountdownComplete();
      setCount(initialCount); // Reset for next time
    }
    return () => clearTimeout(timer);
  }, [isOpen, count, onCountdownComplete, initialCount]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      padding: '20px',
      background: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2>Downloading in {count} seconds...</h2>
    </div>
  );
};

interface DownloadButtonWithCountdownProps {
  fileName: string;
  url: string;
}

const DownloadButtonWithCountdown: FC<DownloadButtonWithCountdownProps> = ({ fileName, url }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const startDownload = () => {
    setIsModalOpen(true);
  };

  const handleCountdownComplete = () => {
    setIsModalOpen(false);
    window.location.href = url; // หรือใช้ Next.js router สำหรับ navigation
  };

  return (
    <div>
      <button onClick={startDownload}>Download {fileName}</button>
      <CountdownModal isOpen={isModalOpen} onCountdownComplete={handleCountdownComplete} />
    </div>
  );
};

const App: FC = () => {
  return (
    <>  
      <Head>
        <title>Download template website สำหรับทำโฆษณาสายเทา ฟรี</title>

        <meta name="description" content="Download template website สำหรับทำโฆษณาสายเทา ฟรี"/>
        {/* ปรับแต่ง meta tags และ elements ตามต้องการ */}
      </Head>
      <div className="container text-center" >
      <Image
              src="/img/facebook.png" 
              alt="Google_Ads_สายเทา" 
              width={480} 
              height={480} 
            />
        <h3>สอนทำเว็บไซต์ sale Page Landing Page เพื่อไว้ใช้กับโฆษณา Facebook สายเทา 2024 (สายเทาห้ามพลาด)</h3>
        <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/xH13j5aZ0tw?si=5ssabdXGxppg0_S5"
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>
      <p>คลิปนี้ก็จะเป็นการสอนทำ sale Page Learning Page สำหรับนำไปไว้ใช้กับทำโฆษณา Facebook สายเทายิง conversion ก็ได้

เริ่มตั้งแต่ต้นก็คือมีการสอนจดโดเมนคือ hosting กับ Host singer ที่ใช้งานง่ายมากๆไม่ยากเลยจากนั้นก็สามารถดาวน์โหลดไฟล์จากหน้าเว็บไซต์ของเราไปได้เลยเพื่อไป

คลิปนี้ค่อนข้างมีเนื้อหาสาระที่สำคัญมากๆทุกคนไม่ควรพลาด สอนตั้งแต่เริ่มจนจบดูจนจบทำเป็นแน่นอนไม่ต้องห่วง

สำหรับท่านใดที่ดูแล้วชื่นชอบคิดว่าคลิปนี้ไม่มีประโยชน์รบกวนกดไลค์กดคอมเม้นกดติดตามให้ด้วยนะครับขอบคุณครับ</p>
        <div className="d-flex">
          <div className="p-2 flex-fill"> 
           
            <DownloadButtonWithCountdown fileName="Facebook" url="facebook.zip" />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
