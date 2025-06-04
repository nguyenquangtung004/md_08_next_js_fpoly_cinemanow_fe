// "use client";
// import LoginScrenn from "@/app/screen/login";
// import AppError from "@/app/error";
import Loading from "@/app/loading";
export default function Home() {
  return (
    <div>

     {/* <LoginScrenn></LoginScrenn> */}
     <Loading></Loading>
     {/* <AppError 
        error={new globalThis.Error("Đây là lỗi test")} 
        reset={() => {
          console.log("Reset được gọi");
          // FUNCTIONALITY: Làm mới trang hoặc thực hiện logic reset
          window.location.reload();
        }} 
      /> */}

      {/* <AppError error={new Error("Test error")} reset={function (): void {
        throw new Error("Function not implemented.");
      } }></AppError> */}
    </div>
  );
}
