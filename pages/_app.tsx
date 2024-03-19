import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
 import '../styles/Home.module.css'
 import '../styles/globals.css'
 import '../styles/style.css'
 import 'bootstrap/dist/css/bootstrap.min.css';
type AppOwnProps = { example: string }
 
export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
    <>
      
      <Component {...pageProps} />
    </>
  )
}
 
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx, example: 'data' }
}