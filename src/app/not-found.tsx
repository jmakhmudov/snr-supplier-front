import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="relative text-center">
        <h1 className="font-bold text-9xl text-blue animate-bounce">404</h1>
        <div className="font-medium">Страница не найдена!</div>
        <Link href={'/'} className="text-blue underline">На главную</Link>
      </div>
    </div>
  )
}