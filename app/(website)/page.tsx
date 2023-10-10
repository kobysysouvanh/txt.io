import AuthForm from "@/app/components/AuthForm";



export default function AuthPage() {
  
  return (
    <div className="flex flex-col h-screen justify-center bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl sm:text-6xl font-bold">txt.io</h1>
      </div>
      <AuthForm/>
    </div>
  );
}
