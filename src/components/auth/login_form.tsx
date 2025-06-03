"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setMessage("Đang xử lý đăng nhập...");
    console.log("Đăng nhập với email:", email, "và mật khẩu", password);
    //Call api ở đây

    try {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setMessage("Đăng nhập thành công!");
      }, 2000);
    } catch (Exception) {
      console.error("Lỗi đăng nhập:", Exception);
      
      setError("Đăng nhập không thành công. Vui lòng thử lại.");
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-x-sm">
      <CardHeader>Đăng nhập</CardHeader>
      <CardDescription>
        Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
      </CardDescription>

      <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
            {message && !error &&(
                <div className="p3 rounded-md text-sm ${success ? 'bg-green-100 text-green-700'} :  'bg-blue-100 text-blue-700'}`">
                    {message}
                    {success}
                </div>
            ) }

              {error && (
            <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            >
            </Input>

            <div className="relative">
                <div className="grid gap-2">
                type={showPassword ? "text" : "password"}
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"/>
                  {showPassword ? "Ẩn" : "Hiện"}
              </div>
                </div>
          </div>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
}
