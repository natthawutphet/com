// ใช้ "use client" ในส่วนแรกของไฟล์
// นี้บ่งชี้ว่า component หรือโมดูลนี้ควรรันบน client-side เท่านั้น

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
    let timer: NodeJS.Timeout | null = null;
    if (isOpen && count > 0) {
      timer = setTimeout(() => setCount(count - 1), 1000);
    } else if (count === 0) {
      onCountdownComplete();
      setCount(initialCount); // Reset for next time
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
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
      {/* Head Component เพื่อกำหนด meta tags และอื่นๆ */}
      {/* Image Component ใช้สำหรับการโหลดรูปภาพ */}
      {/* DownloadButtonWithCountdown Component สำหรับเริ่มต้นการดาวน์โหลด และแสดง CountdownModal */}
    </>
  );
};

export default App;
