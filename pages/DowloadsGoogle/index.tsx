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
        <h1>Download Files</h1>
        <div className="d-flex">
          <div className="p-2 flex-fill"> 
            <Image
              src="/img/Google.png" 
              alt="Google_Ads_สายเทา" 
              width={480} 
              height={480} 
            />
            <DownloadButtonWithCountdown fileName="Google" url="Google.zip" />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
