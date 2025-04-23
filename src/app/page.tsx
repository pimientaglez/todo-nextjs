import MainContainer from "./components/MainContainer";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 bg-slate-950">
      <h1 className="font-mono font-medium text-5xl align-middle mb-2">
        ToDo App
      </h1>
      <MainContainer />
    </div>
  );
}
