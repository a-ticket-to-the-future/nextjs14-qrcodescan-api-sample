"use client"

import Image from "next/image";
import { use, useEffect, useState } from "react";
// import QRCode from ''
// import QRCode from 'next-qrcode' 
import QRCode from 'qrcode.react';
import { useRouter } from "next/navigation";




const Home =  ({currentUser}) => {



  const [isCameraActive, setIsCameraActive] = useState(false)
  const [scannedData, setScannedData] = useState('')
  const router = useRouter()

  //カメラ起動処理
  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      setIsCameraActive(true)

    } catch (error) {
      console.log(error)
    }

    }
  //　スキャンデータ処理
  const handleScan = async (data :any) => {
    setScannedData(data)

    //　スキャンされたデータに応じて処理を行う
    if (data.startsWith('start')){ //"start で始まるデータの場合（開始処理）"

      // 開始処理を行う API　を呼び出す
      const res = await fetch('/api/timecard/start',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: currentUser.id}),
      });
      const data = await res.json()
      console.log(data);

      //　停止時刻をセット（必要に応じて)
      router.push('/list') // 停止処理完了後、一覧画面に遷移させる
    } else {
      console.warn("不正な QR コードが読み込まれました")
    }
  }

  useEffect(()=> {
    // カメラ起動処理 (初期レンダリング時のみ実行)
    handleStartCamera()

  },[])


return (
  <div className=" flex flex-col">
    <div>QRコードに勤怠管理アプリケーション</div>
    {!isCameraActive && (
      <button onClick={handleStartCamera}>カメラを起動</button>
    )}
    {isCameraActive && (
      <video width="640" height="480" autoPlay muted playsInline />
    )}

    {/* <QRCode value={`start:${currentUser.id}`} size={256} onScan={handleScan} /> */}
    <QRCode value={`start:f543d8f5-87ed-4a56-ba17-ded7e83ce040`} size={256} onScan={handleScan} />



  </div>


)


}

export default Home


// export default function Home() {

//   const [url,setUrl] = useState('http://localhost:3000')

//     const [startTime, setStartTime] = useState("")
//     const [data, setData] = useState("")

// // const handleScan = useCallback((data:any) => {
// //     const url = data.text;
// //     handleStart(url)

// //     const now = new Date();
// //     const startTime = now.getTime().toString()
// //     setStartTime(startTime)
// // },[])

// const handleScan = (data:any) => {
//     console.log(data)
//     setData(data)
// }

// const handleStart = (url:string) => {

// }
  
  



    

//   return (
//     <div className='h-[200px] w-auto border-2 border-green-400 mt-10'>
//     <QRCode value={url}  />
//     {/* onScan={} */}
//     {/* {React.createElement(QRCode, {
// value: url,
// })} */}
//     <p>スキャンされたデータ：{data}</p>
// <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
// </div>
//   )
// }



