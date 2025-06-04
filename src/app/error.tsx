// app/error.tsx
"use client"; // NOTE: Error components phải là Client Components trong Next.js

import Link from 'next/link';
import { useEffect } from 'react';

// FUNCTIONALITY: Interface định nghĩa props cho Error component
interface ErrorProps {
  error: Error & { digest?: string }; // NOTE: Next.js thêm digest cho lỗi phía server
  reset: () => void; // FUNCTIONALITY: Hàm để thử render lại segment
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // LOGGING: Log lỗi ra console hoặc service báo cáo lỗi (ví dụ: Sentry)
    console.error("[APP ERROR BOUNDARY]:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString()
    });
  
  }, [error]);

  return (
    <div style={{
      // UI/UX: Layout flexbox để căn giữa nội dung
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* UI/UX: Tiêu đề chính với màu đỏ cảnh báo */}
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem'
      }}>
        😵
      </div>
      
      <h2 style={{ 
        color: '#dc3545', 
        marginBottom: '1rem',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        Ối! Có lỗi xảy ra
      </h2>
      
      <p style={{ 
        marginBottom: '1.5rem', 
        color: '#6c757d',
        fontSize: '1rem',
        maxWidth: '400px',
        lineHeight: '1.5'
      }}>
        Đã xảy ra sự cố không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu lỗi tiếp tục xảy ra.
      </p>
      
      {/* DEBUG: Hiển thị thông báo lỗi chi tiết trong môi trường development */}
      {/* {process.env.NODE_ENV === 'development' && error?.message && (
        <details style={{ marginBottom: '1.5rem', maxWidth: '600px' }}>
          <summary style={{
            cursor: 'pointer',
            color: '#6c757d',
            marginBottom: '0.5rem',
            userSelect: 'none'
          }}>
            🔍 Chi tiết lỗi (chỉ hiện trong development)
          </summary>
          <div style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #dee2e6',
            textAlign: 'left',
            fontSize: '12px',
            lineHeight: '1.4',
            overflowX: 'auto'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Message:</strong> {error.message}
            </div>
            {error.digest && (
              <div style={{ marginBottom: '8px' }}>
                <strong>Digest:</strong> {error.digest}
              </div>
            )}
            {error.stack && (
              <div>
                <strong>Stack:</strong>
                <pre style={{ 
                  margin: '4px 0 0 0', 
                  whiteSpace: 'pre-wrap',
                  fontSize: '11px'
                }}>
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        </details>
      )} */}
      
      {/* FUNCTIONALITY: Nhóm các button action */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* FUNCTIONALITY: Button thử lại với UX tốt hơn */}
        <button
          onClick={() => {
            // REVIEW: Thử render lại segment
            console.log("🔄 Đang thử lại...");
            reset();
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            minWidth: '120px'
          }}
          onMouseEnter={(e) => {
            // UI/UX: Hover effect
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🔄 Thử lại
        </button>
        
        <Link 
          href="/"
          style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            minWidth: '120px',
            display: 'inline-block',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#545b62';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#6c757d';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🏠 Trang chủ
        </Link>
      </div>
      
      {/* FEATURE: Thông tin hỗ trợ thêm */}
      <div style={{
        marginTop: '2rem',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #dee2e6',
        maxWidth: '400px'
      }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#6c757d',
          lineHeight: '1.4'
        }}>
          💡 <strong>Mẹo:</strong> Nếu lỗi tiếp tục xảy ra, hãy thử:
        </p>
        <ul style={{
          margin: '8px 0 0 0',
          paddingLeft: '20px',
          fontSize: '13px',
          color: '#6c757d',
          textAlign: 'left'
        }}>
          <li>Làm mới trang (F5)</li>
          <li>Xóa cache trình duyệt</li>
          <li>Kiểm tra kết nối internet</li>
        </ul>
      </div>
      
      <p style={{
        marginTop: '1.5rem',
        fontSize: '12px',
        color: '#adb5bd'
      }}>
      </p>
    </div>
  );
}

