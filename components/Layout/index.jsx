import Navigation from "../../components/Navigation"
import Head from "next/head"

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Snake App</title>
      </Head>
      <div className="flex flex-col justify-center w-full font-mono bg-gray-dark">
        <Navigation />
        <div className="flex w-full justify-center h-[100vh]">
          <div className="container max-w-[1092px]">
            <div className="flex flex-wrap justify-center px-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
