import React, { useEffect, useState } from 'react'

export default function Countdown({ targetDate }){
  const [now, setNow] = useState(Date.now())

  useEffect(()=>{
    const id = setInterval(()=>setNow(Date.now()), 1000)
    return ()=>clearInterval(id)
  },[])

  const diff = Math.max(0, new Date(targetDate).getTime() - now)
  const days = Math.floor(diff / (1000*60*60*24))
  const hours = Math.floor((diff / (1000*60*60)) % 24)
  const minutes = Math.floor((diff / (1000*60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return (
    <div className="countdown">
      <div className="box"><div className="num">{days}</div><div className="lbl">days</div></div>
      <div className="box"><div className="num">{String(hours).padStart(2,'0')}</div><div className="lbl">hours</div></div>
      <div className="box"><div className="num">{String(minutes).padStart(2,'0')}</div><div className="lbl">minutes</div></div>
      <div className="box"><div className="num">{String(seconds).padStart(2,'0')}</div><div className="lbl">seconds</div></div>
    </div>
  )
}
