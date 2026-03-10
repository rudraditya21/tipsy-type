import Keyboard from "@/components/Keyboard";
import TypingTest from "@/components/TypingTest";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center px-4 pb-6 pt-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(80vh-3rem)] w-full max-w-[1600px] flex-col items-center">
        <div className="flex w-full flex-1 items-end justify-center pb-32">
          <TypingTest />
        </div>
        <div className="flex w-full justify-center">
          <div className="origin-bottom scale-[0.86] sm:scale-100 lg:scale-[1.08] xl:scale-[1.12]">
            <Keyboard />
          </div>
        </div>
      </div>
    </main>
  );
}
