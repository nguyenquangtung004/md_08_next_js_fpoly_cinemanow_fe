// app/loading.tsx
"use client";
export default function Loading() {
  // Bạn có thể thêm bất kỳ UI skeleton nào ở đây
  // Hoặc một spinner đơn giản
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh', // Chiều cao tối thiểu để spinner ở giữa màn hình
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <Spinner />
      <p style={{ fontSize: '1.1rem', color: '#555' }}>Đang tải dữ liệu...</p>
    </div>
  );
}

// Một component Spinner đơn giản (bạn có thể dùng thư viện UI hoặc tự tạo phức tạp hơn)
function Spinner() {
  return (
    <div style={{
      border: '4px solid rgba(0, 0, 0, 0.1)',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      borderLeftColor: '#09f', // Màu của spinner
      animation: 'spin 1s ease infinite'
    }}>
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}