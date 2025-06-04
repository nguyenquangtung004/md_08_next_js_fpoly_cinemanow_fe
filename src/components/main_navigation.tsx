'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* NOTE: Logo hoặc tên ứng dụng */}
        <div className="text-xl font-bold">
          <Link href="/">MyApp</Link>
        </div>

        {/* NOTE: Menu điều hướng */}
        <div className="space-x-4">
          <Link 
            href="/" 
            className="hover:text-gray-300 transition-colors"
          >
            Trang chủ
          </Link>
          
          <Link 
            href="screen/login" 
            className="hover:text-gray-300 transition-colors ${
              pathname === '/dashboard' ? 'text-blue-400' : ''
            }"
          >
            Đăng nhập
          </Link>
          
          <Link 
            href="/dashboard" 
            className="hover:text-gray-300 transition-colors"
          >
            Dashboard
          </Link>
        </div>

        {/* NOTE: Button với navigation programmatic */}
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors"
        >
          Đi đến Dashboard
        </button>

        <div className="text-xs text-gray-400 hidden lg:block">
          Path: {pathname}
        </div>
      </div>
    </nav>
  )
}