import React from 'react';
import Head from 'next/head';
import { useLogin } from '../lib/hooks/useLogin'
import { useAxiosLoader, ax } from '../lib/hooks/useAxiosLoader'
import { useInfoState } from '../store/index'

const Home = () => {
  useLogin()
  const { refreshToken } = useAxiosLoader()
  const [studentID, token] = useInfoState(state => [state.studentID, state.token])

  const fetchSchoolLife = async () => {
    const { status } = await ax.get('https://incu-api.ncuos.com/v2/api/schoolLife')

    alert(status)
  }

  return (
    <div>
      <Head>
        <title>测试页面</title>
      </Head>
      <div>学号: {studentID}</div>
      <div>token: {token}</div>
      <button onClick={() => fetchSchoolLife()}>测试校园生活是否能成功拉取</button>
      <button onClick={() => refreshToken()}>测试刷新token</button>
    </div>
  )
}

export default Home;