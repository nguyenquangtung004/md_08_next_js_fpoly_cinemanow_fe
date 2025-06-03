"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

// FUNCTIONALITY: Component form đăng nhập với validation và UI/UX tối ưu
export default function LoginForm() {
  // NOTE: State management cho form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // FUNCTIONALITY: Xử lý submit form với validation
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // TODO: Thêm validation chi tiết cho email và password
    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    setMessage("Đang xử lý đăng nhập...");
    
    // DEBUG: Log thông tin đăng nhập (chỉ để development)
    console.log("Đăng nhập với email:", email);
    
    // TODO: Thay thế setTimeout bằng actual API call
    try {
      // HACK: Sử dụng setTimeout để simulate API call - cần thay thế bằng real API
      await new Promise((resolve) => {
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
          setMessage("Đăng nhập thành công!");
          resolve(true);
        }, 2000);
      });
    } catch (exception) {
      // FIXME: Cần xử lý các loại error khác nhau từ API
      console.error("Lỗi đăng nhập:", exception);
      setLoading(false);
      setError("Đăng nhập không thành công. Vui lòng thử lại.");
      setMessage("");
    }
  };

  // UI/UX: Toggle hiển thị/ẩn password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // FUNCTIONALITY: Reset error message khi user thay đổi input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white">
        {/* UI/UX: Header section với title và description */}
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Đăng nhập
          </CardTitle>
          <CardDescription className="text-gray-600">
            Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
          </CardDescription>
        </CardHeader>

        {/* FUNCTIONALITY: Form chính với validation */}
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {/* NOTE: Email input field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                required
                onChange={handleEmailChange}
                disabled={loading}
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* NOTE: Password input field với toggle show/hide */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={loading}
                  className="h-11 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {/* UI/UX: Toggle button để show/hide password */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={toggleShowPassword}
                  disabled={loading}
                  className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* UI/UX: Message display area */}
            {message && !error && (
              <div
                className={`p-3 rounded-md text-sm ${
                  success
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* UI/UX: Error message display */}
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
                {error}
              </div>
            )}
          </CardContent>

          {/* FUNCTIONALITY: Submit button */}
          <CardFooter className="pt-4">
            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}