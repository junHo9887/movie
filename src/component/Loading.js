import React from 'react'
import '../css/Loading.css'
import Spinner from "../Spin-1s-213px.gif"

function Loading() {
  return (
    <div className='Loading'>
      <h3>잠시만 기다려 주세요</h3>
      <img src={Spinner} alt='로딩'/>
    </div>
  )
}
export default Loading